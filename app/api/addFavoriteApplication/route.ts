import { NextRequest, NextResponse } from 'next/server';
import User from '../../utils/models/userModel';
import mongoose from 'mongoose';

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { userEmail, applicationId } = await req.json();

    try {
        // Find the user first
        const user = await User.findOne({ email: userEmail });

        // Find the job posting and the application in the user's jobPostings
        let application;
        let originJobPosting;
        for (let job of user.jobPostings) {
            application = job.applications.find((app:any) => app._id.toString() === applicationId);
            if (application) {
                originJobPosting = job._id;
                break;
            }
        }

        if (!application) {
            return NextResponse.json({ message: 'Application not found.' });
        }

        // Add the originJobPosting to the application
        application.originJobPosting = originJobPosting;

        // Add the application to the favoriteApplications list
        user.favoriteApplications.push(application);
        await user.save();

        return NextResponse.json({ message: 'Application added to favorites.' });
    } catch (err) {
        console.error('Error in POST route:', err);

        return NextResponse.json({ message: 'Internal server error' });
    }
};
