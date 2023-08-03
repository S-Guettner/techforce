import { NextResponse } from 'next/server';
import User from '@/app/utils/models/userModel';
import connectionToDB from '@/app/utils/database';


export const POST = async (req: Request, res: Response) => {
    connectionToDB()
    
    const {
        userEmail,
        jobTitle,
        detailedJobDescription,
        tasks,
        offers,
        requirements,
        contactPersonName,
        contactPersonNumber,
        contactPersonEmail,
        location,
        latitude,
        longitude,
    } = await req.json();

    console.log(latitude, longitude);

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user || !user.companyDetails) {
            return NextResponse.json({ message: 'User not found or company details not set.' });
        }

        const jobListing = {
            jobTitle,
            detailedJobDescription,
            tasks,
            offers,
            requirements,
            contactPersonName,
            contactPersonNumber,
            contactPersonEmail,
            location,
            latitude,
            longitude,
        };

        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, { $push: { jobPostings: jobListing } }, { new: true });

        return NextResponse.json({ updatedUser });
    } catch (err) {
        return NextResponse.json({ message: err });
    }
};
