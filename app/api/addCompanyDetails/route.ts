import { NextRequest, NextResponse } from 'next/server';
import User from '../../utils/models/userModel';
import connectionToDB from '@/app/utils/database';

export const POST = async (req: NextRequest, res: NextResponse) => {
    connectionToDB()

    const { userEmail, companyName, companyImage, companyLocation, yearFounded, numberOfEmployees } = await req.json();
    console.log(userEmail, companyName, companyImage, companyLocation, yearFounded, numberOfEmployees);
    try {
        const companyDetails = { companyName, companyImage, companyLocation, yearFounded, numberOfEmployees };

        const user = await User.findOneAndUpdate({ email: userEmail }, { $set: { companyDetails: companyDetails } }, { new: true });

        if (user) {
            return NextResponse.json({ message: 'Company details updated successfully' });
        } else {
            return NextResponse.json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error in POST route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};
