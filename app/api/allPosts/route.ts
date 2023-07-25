import testUser from '@/app/utils/models/userModel';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import connectionToDB from '@/app/utils/database';

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    connectionToDB();

    try {
        const jobPostings = await testUser.find().select('jobPostings');
        console.log(jobPostings);
        const allJobPostings = jobPostings.map((user) => user.jobPostings).flat();
        console.log('Job postings:', allJobPostings);

        return NextResponse.json({ jobPostings: allJobPostings });
    } catch (err) {
        console.error('Error in POST route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};
