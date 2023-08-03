import NextAuth, { AuthOptions, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import userTest from '@/app/utils/models/userModel';
import connectionToDB from '@/app/utils/database';
import Providers from 'next-auth/providers';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

/* google auth */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

/* github auth */
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
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    throw new Error('Missing credentials');
                }

                connectionToDB();

                const user = await userTest.findOne({ email: credentials?.email });

                if (user) {
                    const isValid = bcrypt.compareSync(credentials?.password, user.password);
                    if (isValid) {
                        return { id: user.id, email: user.email };
                    } else {
                        throw new Error('Invalid password');
                    }
                } else {
                    const hashedPassword = bcrypt.hashSync(credentials?.password, 10);
                    const newUser = await userTest.create({
                        email: credentials?.email,
                        password: hashedPassword,
                    });
                    console.log('User not in DB, created new user');
                    return { id: newUser.id, email: newUser.email };
                }
            },
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
