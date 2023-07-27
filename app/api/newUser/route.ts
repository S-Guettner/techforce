import { NextResponse } from 'next/server';
import userTest from '@/app/utils/models/userModel';
import connectionToDB from '@/app/utils/database';

export const POST = async (req: Request, res: NextResponse) => {
    connectionToDB();

    const { userEmail, userType } = await req.json();

    console.log('email', userEmail);
    console.log('userType', userType);

    try {
        const userCheck = await userTest.findOne({ email: userEmail });

        if (!userCheck) {
            const newUser = await userTest.create({
                email: userEmail,
                userType: userType,
            });
            console.log(newUser);
            console.log('User not in DB');
            return NextResponse.json({ newUser });
        } else {
            console.log('User already in DB');
            return NextResponse.json(userCheck)
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json(error)

    }
};


          

