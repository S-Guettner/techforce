import { NextResponse } from 'next/server';
import testUser from '@/app/utils/models/userModel';
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
        const { jobId, userEmail } = await req.json();

        const user = await testUser.findOne({ email: userEmail });

        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }

        const jobPosting = user.jobPostings.find((post:Post) => post._id.toString() === jobId);

        if (!jobPosting) {
            return NextResponse.json({ message: 'Job post not found' });
        }

        return NextResponse.json({ jobPosting });
    } catch (err) {
        return NextResponse.json({ message: err });
    }
};