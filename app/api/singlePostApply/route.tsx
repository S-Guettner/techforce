import { NextResponse } from 'next/server';
import User from '@/app/utils/models/userModel';
import { ObjectId } from 'mongodb';

interface Post {
    jobTitle: string
    shortJobDescription: string
    detailedJobDescription: string
    tasks: string[]
    offers: string[]
    requirements: string[]
    contactPersonName: string
    contactPersonNumber: string
    contactPersonEmail: string
    _id: ObjectId
    timestamp: Date
}
export const POST = async (req: Request, res: Response) => {
    
    try {
        const { jobId } = await req.json();

        // Find the user who has the job posting with the given jobId
        const user = await User.findOne({ "jobPostings._id": new ObjectId(jobId) });

        if (!user) {
            return NextResponse.json({ message: 'Job post not found' });
        }

        // Find the specific job posting in the user's jobPostings array
        const jobPosting = user.jobPostings.id(jobId);

        return NextResponse.json({ jobPosting });
    } catch (err) {
        return NextResponse.json({ message: err });
    }
};