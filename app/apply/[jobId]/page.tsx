'use client'
import { FC, useState, useRef } from 'react';
import Navbar from '@/app/components/Navbar';
import axios from 'axios';

import "@uploadthing/react/styles.css";
import { UploadButton } from "../../utils/uploadthing";

interface PageProps {
    params: { jobId: string };
}

const Page: FC<PageProps> = ({ params }) => {
    console.log(params);

    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [filePath, setFilePath] = useState<string | undefined>();

    // Create a ref for each input field
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const telephoneNumberRef = useRef<HTMLInputElement>(null);
    const emailAdressRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const salaryExpectationRef = useRef<HTMLInputElement>(null);

    console.log(filePath)
    
    const applyHandler = () => {
       
        axios.post('/api/newApplication', {
            jobId:params.jobId,
            firstName: firstNameRef.current ? firstNameRef.current.value : '',
            lastName: lastNameRef.current ? lastNameRef.current.value : '',
            telephoneNumber: telephoneNumberRef.current ? telephoneNumberRef.current.value : '',
            emailAdress: emailAdressRef.current ? emailAdressRef.current.value : '',
            location: locationRef.current ? locationRef.current.value : '',
            salaryExpectation: salaryExpectationRef.current ? salaryExpectationRef.current.value : '',
            cvPath: filePath,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <Navbar />
            <main className="flex justify-center pt-6">
                <div>
                    <label htmlFor="firstName">Vorname</label>
                    <input ref={firstNameRef} className='border p-2 mb-5 block' type="text" name="firstName" id="firstName" />
                    <label htmlFor="lastName">Nachname</label>
                    <input ref={lastNameRef} className='border p-2 mb-5 block' type="text" name="lastName" id="lastName" />
                    <label htmlFor="telephoneNumber">Telefon</label>
                    <input ref={telephoneNumberRef} className='border p-2 mb-5 block' type="text" name="telephoneNumber" id="telephoneNumber" />
                    <label htmlFor="emailAdress">E-Mail-Adresse</label>
                    <input ref={emailAdressRef} className='border p-2 mb-5 block' type="text" name="emailAdress" id="emailAdress" />
                    <label htmlFor="location">Wohnort</label>
                    <input ref={locationRef} className='border p-2 mb-5 block' type="text" name="location" id="location" />
                    <label htmlFor="salaryExpectation">Gehaltsvorstellung</label>
                    <input ref={salaryExpectationRef} className='border p-2 mb-5 block' type="text" name="salaryExpectation" id="salaryExpectation" />
                    <p className='mb-2 text-center'>Lebenslauf als PDF importieren</p>
                    <div className='mb-10'>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                setFilePath(res && res[0].fileUrl)
                                console.log("Files: ", res && res[0].fileUrl);
                                console.log("Files: ", res && res[0].fileKey);

                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    </div>
                    <div className='w-full flex justify-center'>
                        <button className='mx-auto border bg-[#66af99] p-2 w-full  text-white' onClick={() => applyHandler()}>
                            Jetzt bewerben
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;