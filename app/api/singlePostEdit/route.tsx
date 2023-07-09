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
        const { jobId, userEmail } = await req.json();

        const user = await testUser.findOne({ email: userEmail });

        
    } catch (err) {
        return NextResponse.json({ message: err });
    }
};