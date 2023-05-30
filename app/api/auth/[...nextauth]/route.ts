import NextAuth, { AuthOptions, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import userModel from '../../../utils/models/userModel';
import { connectionToDB } from '@/app/utils/database';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            await connectionToDB();

            try {
                const userEmail = user?.email
                
                const userCheck = await userModel.findOne({ email: userEmail });

                if (!userCheck){
                    await userModel.create({
                        userName: user.name,
                        email: userEmail,
                    });
                }else{
                    console.log("User already exists")
                }
                return true; // Return true to indicate successful sign-in
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
