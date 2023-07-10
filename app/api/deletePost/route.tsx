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
    contactPerson: string
    _id: ObjectId
    timestamp: Date
}

export const POST = async (req: Request, res: Response) => {
    try {
        const { postId, userEmail } = await req.json();

        const user = await testUser.findOne({ email: userEmail });

        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }

        const jobPostings = user.jobPostings;

        // Find the index of the job post with the specified postId
        const postIndex = jobPostings.findIndex((post:any) => post._id.toString() === postId);

        if (postIndex === -1) {
            return NextResponse.json({ message: 'Job post not found' });
        }

        // Remove the job post from the user's jobPostings array
        jobPostings.splice(postIndex, 1);

        // Save the updated user object
        await user.save();

        return NextResponse.json({ message: 'Job post deleted' });

    } catch (err) {
        return NextResponse.json({ message: err });
    }
};