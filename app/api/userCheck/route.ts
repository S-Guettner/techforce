import { NextRequest, NextResponse } from 'next/server';
import userCompany from '../../utils/models/userModel';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        return NextResponse.json({email})
    } catch (err) {
        console.error(err);
        return NextResponse.json({ err });
    }
}
