import NextAuth, { AuthOptions, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import userTest from '@/app/utils/models/userModel';
import connectionToDB from '@/app/utils/database';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

/* google auth */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

/* github auth */
const GITHUB_ID = process.env.GITHUB_ID as string;
const GITHUB_SECRET = process.env.GITHUB_SECRET as string;

/* mail magic link auth */
const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST as string;
const EMAIL_SERVER_PORT = process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT) : undefined;
const EMAIL_SERVER_USER = process.env.EMAIL_SERVER_USER as string;
const EMAIL_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD as string;

/* mail provider */
/* const mailer = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
    },
});
const emailAdapter = EmailProvider({
    server: mailer,
    from: process.env.EMAIL_FROM,
});
 */
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
        /*         EmailProvider({
            server: mailer,
            from: process.env.EMAIL_FROM,
        }), */
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
                    console.log('User not in DB');
                } else {
                    console.log('User already in DB');
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
