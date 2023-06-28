import NextAuth, { AuthOptions, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import userTest from '@/app/utils/models/userModel';
import connectionToDB from '@/app/utils/database';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const GITHUB_ID = process.env.GITHUB_ID as string;
const GITHUB_SECRET = process.env.GITHUB_SECRET as string;

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        }),
    ],
    secret: process.env.JWT_SECRET,

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            connectionToDB();

            try {
                const userEmail = user?.email;

                const userCheck = await userTest.findOne({ email: userEmail });

                if (!userCheck) {
                    await userTest.create({
                        email: userEmail,
                    });
                    console.log("User not in DB")
                }else{
                    console.log("User already in DB")
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
