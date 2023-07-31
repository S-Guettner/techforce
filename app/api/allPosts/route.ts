import testUser from '@/app/utils/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import connectionToDB from '@/app/utils/database';

interface Body {
    searchTerm?: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    connectionToDB();

    try {
        const { searchTerm } = await req.json();
        console.log('searchTerm', searchTerm);

        const users = await testUser.find().select('jobPostings');

        let allJobPostings = users.map((user) => user.jobPostings).flat();

        // Wenn ein Suchbegriff vorhanden ist, filtern von Job-Postings
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            allJobPostings = allJobPostings.filter((posting) => posting.jobTitle.toLowerCase().includes(lowerCaseSearchTerm));
        }

        console.log('Job postings:', allJobPostings);

        return NextResponse.json({ jobPostings: allJobPostings });
    } catch (err) {
        console.error('Error in POST route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};
