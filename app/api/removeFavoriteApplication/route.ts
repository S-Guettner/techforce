import { NextRequest, NextResponse } from 'next/server';
import User from '../../utils/models/userModel'
import connectionToDB from '@/app/utils/database';

export const DELETE = async (req: NextRequest, res: NextResponse) => {
    connectionToDB();

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

        const applicationIndex = jobWithApplication.favoriteApplications.indexOf(application);
        if (applicationIndex > -1) {
            jobWithApplication.favoriteApplications.splice(applicationIndex, 1);
        }

        await user.save();

        return NextResponse.json({ message: 'Application removed from favorites.' });
    } catch (err) {
        console.error('Error in DELETE route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};