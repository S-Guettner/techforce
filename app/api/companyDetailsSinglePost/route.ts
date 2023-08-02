import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../utils/models/userModel';

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { postId } = await req.json();

        // Validate postId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return NextResponse.json({ message: 'Invalid post id' });
        }

        // Find all the users
        const users = await User.find().lean();

        let foundUser = null;

        // Iterate over each user and their jobPostings array
        for (let i = 0; i < users.length; i++) {
            const user = users[i];

            for (let j = 0; j < user.jobPostings.length; j++) {
                const jobPosting = user.jobPostings[j];

                // Check if the job posting id matches the provided post id
                if (jobPosting._id.toString() === postId) {
                    foundUser = user;
                    break;
                }
            }

            // If user is found, break from the loop
            if (foundUser) {
                break;
            }
        }

        if (!foundUser) {
            return NextResponse.json({ message: 'No user found for this post' });
        }

        return NextResponse.json(foundUser.companyDetails);
    } catch (err) {
        console.error('Error in POST route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};
