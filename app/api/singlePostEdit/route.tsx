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
    _id: ObjectId
    timestamp: Date
}

export const POST = async (req: Request, res: Response) => {
    try {
        const { postId, userEmail, jobTitle, shortJobDescription, detailedJobDescription, tasks, offers, requirements, contactPersonName } = await req.json();

        const user = await testUser.findOneAndUpdate(
            { email: userEmail, 'jobPostings._id': postId },
            {
                $set: {
                    'jobPostings.$.jobTitle': jobTitle,
                    'jobPostings.$.shortJobDescription': shortJobDescription,
                    'jobPostings.$.detailedJobDescription': detailedJobDescription,
                    'jobPostings.$.tasks': tasks,
                    'jobPostings.$.offers': offers,
                    'jobPostings.$.requirements': requirements,
                    'jobPostings.$.contactPersonName': contactPersonName,
                },
            },
            { new: true }
        );

        return NextResponse.json(user);

    } catch (err) {
        return NextResponse.json({ message: err });
    }
};