import { NextResponse } from 'next/server';
import testUser from '@/app/utils/models/userModel';

export const POST = async (req: Request, res: NextResponse) => {
    const { jobId, firstName, lastName, telephoneNumber, emailAdress, location, salaryExpectation, cvPath, message } = await req.json();

    const application = {
        firstName,
        lastName,
        telephoneNumber,
        emailAdress,
        location,
        salaryExpectation,
        cvPath,
        message
    };

    try {
        // Find the user with the specific job posting
        const user = await testUser.findOne({ 'jobPostings._id': jobId });

        if (!user) {
            return NextResponse.json({ message: 'Job posting not found' });
        }

        // Find the specific job posting
        const jobPosting = user.jobPostings.id(jobId);

        // Add the application to the job posting's applications array
        jobPosting.applications.push(application);

        // Save the user document
        await user.save();

        return NextResponse.json({ user });
    } catch (err) {
        return NextResponse.json({ message: err});
    }
};