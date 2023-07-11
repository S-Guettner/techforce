import { NextResponse, NextRequest } from 'next/server';
import testUser from '@/app/utils/models/userModel';

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const jobPostings = await testUser.find().select('jobPostings');
        const allJobPostings = jobPostings.map((user) => user.jobPostings).flat();
        return NextResponse.json({ jobPostings: allJobPostings });
    } catch (err) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 400 });
    }
};
