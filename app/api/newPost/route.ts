import { NextResponse } from 'next/server';
import testUser from '@/app/utils/models/userModel';

export const POST = async (req: Request, res: Response) => {
    const { userEmail, jobTitle, shortJobDescription, detailedJobDescription, tasks, offers, requirements, contactPerson } = await req.json();
    const jobListing = { jobTitle, shortJobDescription, detailedJobDescription, tasks, offers, requirements, contactPerson };
    console.log("email" ,userEmail);
    console.log(jobListing);
    try {
        const updateJobPostings = await testUser.findOneAndUpdate({ email: userEmail }, { $push: { jobPostings: jobListing } }, { new: true });
        return NextResponse.json({ updateJobPostings });
    } catch (err) {
        return NextResponse.json({ message: err });
    }
};
