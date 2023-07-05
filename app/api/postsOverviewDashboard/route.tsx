import { NextResponse } from 'next/server';
import testUser from '@/app/utils/models/userModel';

export const POST = async (req: Request, res: Response) => {
    const { userEmail } = await req.json();

    try {
        const user = await testUser.findOne({ email: userEmail })
        const jobPosts = user.jobPostings
        return NextResponse.json({ jobPosts });
    } catch (err) {
        return NextResponse.json({ message: err });
    }
};
