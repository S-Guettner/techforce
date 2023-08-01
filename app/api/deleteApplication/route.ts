import { NextRequest, NextResponse } from 'next/server';
import User from '../../utils/models/userModel';
import mongoose from 'mongoose';

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { userEmail, applicationId } = await req.json();

    try {
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { $pull: { 'jobPostings.$[].applications': { _id: new mongoose.Types.ObjectId(applicationId) } } },
            { new: true }
        );

        return NextResponse.json({ message: 'Application successfully deleted.' });
    } catch (err) {
        console.error('Error in POST route:', err);

        return NextResponse.json({ message: 'Internal server error' });
    }
};
