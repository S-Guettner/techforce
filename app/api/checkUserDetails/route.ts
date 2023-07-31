import {NextResponse, NextRequest} from 'next/server'
import User from '../../utils/models/userModel';

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
       const { userEmail } = await req.json();

        if (!userEmail) {
            return NextResponse.json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return NextResponse.json({ message: 'User not found' });
        }

        if (!user.companyDetails || !user.companyDetails.companyName || !user.companyDetails.companyImage || !user.companyDetails.companyLocation) {
            const result = false
            return NextResponse.json({ result });
        }

        // if everything is fine, continue with your logic
        return NextResponse.json({ message: 'Success', result: true, data: user });
    } catch (err) {
        console.error('Error in POST route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};
