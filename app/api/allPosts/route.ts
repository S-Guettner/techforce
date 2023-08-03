import testUser from '@/app/utils/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import connectionToDB from '@/app/utils/database';

interface Application {
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    emailAdress: string;
    cvPath: string;
    location: string;
    salaryExpectation: string;
    message: string;
}

interface CompanyDetails {
    companyName: string;
    companyImage: string;
    companyLocation: string;
    yearFounded: string;
    numberOfEmployees: string;
}

interface JobPosting {
    jobTitle: string;
    shortJobDescription: string;
    detailedJobDescription: string;
    tasks: string[];
    offers: string[];
    requirements: string[];
    contactPersonName: string;
    contactPersonNumber: string;
    contactPersonEmail: string;
    applications: Application[];
    companyDetails: CompanyDetails;
    timestamp: Date;
    location: string;
    latitude: number;
    longitude: number;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
    connectionToDB();

    try {
        const { searchTerm, longitude, latitude, radius } = await req.json();
        console.log('searchTerm', searchTerm);

        const users = await testUser.find().select('jobPostings companyDetails');

        let allJobPostings: JobPosting[] = users
            .map((user: any) => {
                return user.jobPostings.map((posting: any) => {
                    return { ...posting._doc, companyDetails: user.companyDetails };
                });
            })
            .flat();

        // Wenn ein Suchbegriff vorhanden ist, filtern von Job-Postings
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            allJobPostings = allJobPostings.filter((posting: JobPosting) => posting.jobTitle.toLowerCase().includes(lowerCaseSearchTerm));
        }

        console.log('Job postings:', allJobPostings);

        return NextResponse.json({ jobPostings: allJobPostings });
    } catch (err) {
        console.error('Error in POST route:', err);
        return NextResponse.json({ message: 'Internal server error' });
    }
};
