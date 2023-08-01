import { NextRequest, NextResponse } from 'next/server';
import User from '../../utils/models/userModel';
import mongoose from 'mongoose';
import connectionToDB from '@/app/utils/database';

export const POST = async (req: NextRequest, res: NextResponse) => {
    connectionToDB()
    
    const { userEmail, applicationId } = await req.json();

    try {
        const user = await User.findOne({ email: userEmail });

        let application;
        let jobWithApplication;
        for (let job of user.jobPostings) {
            application = job.applications.find((app: any) => app._id.toString() === applicationId);
            if (application) {
                jobWithApplication = job;
                break;
            }
        }

        if (!application) {
            return NextResponse.json({ message: 'Application not found.' });
        }

        jobWithApplication.favoriteApplications.push(application);
        await user.save();

        return NextResponse.json({ message: 'Application added to favorites.' });
    } catch (err) {
        console.error('Error in POST route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};