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

    const [fileName, setFileName] = useState<string | undefined>();
    const [filePath, setFilePath] = useState<string | undefined>();

    const [uploadState, setUploadState] = useState(false)

    // Create a ref for each input field
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const telephoneNumberRef = useRef<HTMLInputElement>(null);
    const emailAdressRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const salaryExpectationRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    console.log(filePath)

    const applyHandler = () => {

        axios.post('/api/newApplication', {
            jobId: params.jobId,
            firstName: firstNameRef.current ? firstNameRef.current.value : '',
            lastName: lastNameRef.current ? lastNameRef.current.value : '',
            telephoneNumber: telephoneNumberRef.current ? telephoneNumberRef.current.value : '',
            emailAdress: emailAdressRef.current ? emailAdressRef.current.value : '',
            location: locationRef.current ? locationRef.current.value : '',
            salaryExpectation: salaryExpectationRef.current ? salaryExpectationRef.current.value : '',
            cvPath: filePath,
            message: messageRef.current ? messageRef.current.value : ''
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
            <main className="flex justify-center ">
                <div>
                    <label htmlFor="firstName">Vorname</label>
                    <input ref={firstNameRef} className='border p-2 mb-2  block' type="text" name="firstName" id="firstName" />
                    <label htmlFor="lastName">Nachname</label>
                    <input ref={lastNameRef} className='border p-2 mb-2  block' type="text" name="lastName" id="lastName" />
                    <label htmlFor="telephoneNumber">Telefon</label>
                    <input ref={telephoneNumberRef} className='border p-2 mb-2  block' type="text" name="telephoneNumber" id="telephoneNumber" />
                    <label htmlFor="emailAdress">E-Mail-Adresse</label>
                    <input ref={emailAdressRef} className='border p-2 mb-2  block' type="email" name="emailAdress" id="emailAdress" />
                    <label htmlFor="location">Wohnort</label>
                    <input ref={locationRef} className='border p-2 mb-2  block' type="text" name="location" id="location" />
                    <label htmlFor="salaryExpectation">Gehaltsvorstellung</label>
                    <input ref={salaryExpectationRef} className='border p-2 mb-2  block' type="text" name="salaryExpectation" id="salaryExpectation" />
                    <label className='block' htmlFor="message">Nachricht</label>
                    <textarea onChange={() => console.log(messageRef.current?.value)} ref={messageRef} className='border max-h-28' name="message" id="message" cols={26} rows={3} />

                    {uploadState ? (
                        <div className='mb-3'>
                            <p className='mb-2 text-center'>Lebenslauf als PDF importieren</p>
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    setFilePath(res && res[0].fileUrl)
                                    setFileName(res && res[0].fileKey)
                                    setUploadState(true)
                                    console.log("Files: ", res && res[0].fileUrl);
                                    console.log("FilesNAME: ", res && res[0].fileKey);

                                }}
                                onUploadError={(error: Error) => {
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                        </div>
                    ) : (
                        <div>
                            <p className='text-center pt-2 mb-2'>Hochladen von Lebenslauf <br/> war erfolgreich</p>
                                <svg className='mx-auto mb-7' stroke="#66af99" fill="#66af99" strokeWidth="0" viewBox="0 0 512 512" height="2.5rem" width="2.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M170.718 216.482L141.6 245.6l93.6 93.6 208-208-29.118-29.118L235.2 279.918l-64.482-63.436zM422.4 256c0 91.518-74.883 166.4-166.4 166.4S89.6 347.518 89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082 45.764 6.241L334 63.6C310.082 53.2 284.082 48 256 48 141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208h-41.6z"></path></svg>
                        </div>

                    )
                    }

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