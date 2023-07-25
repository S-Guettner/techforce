import { NextResponse } from 'next/server';
import userTest from '@/app/utils/models/userModel';
import connectionToDB from '@/app/utils/database';

export const POST = async (req: Request, res: Response) => {
    
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
                    return NextResponse.json({newUser})
                    console.log(newUser)
                    console.log('User not in DB');
                } else {
                    console.log('User already in DB');
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
};


          

