import { NextRequest, NextResponse } from 'next/server';

import userTest from '@/app/utils/models/userModel';

export async function POST(req: Request) {
    const { mail } = await req.json();

    try {
        
        
        const check = userTest.findOne({ mail });

        return NextResponse.json({ mail});
    } catch (err) {
        console.error(err);
        return NextResponse.json({ err });
    }
}
