'use client'
import { FC, useState, useEffect, useRef } from 'react'
import Navbar from '@/app/components/Navbar'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import "@uploadthing/react/styles.css";
import { UploadButton } from "../../utils/uploadthing";
import axios from 'axios';
import { useRouter } from 'next/navigation'


interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

    const { data: session } = useSession()

    const companyNameRef = useRef<HTMLInputElement>(null);
    const companyLocationRef = useRef<HTMLInputElement>(null);
    const numberOfEmployeesRef = useRef<HTMLInputElement>(null);
    const yearFoundedRef = useRef<HTMLInputElement>(null);

    const [filePath, setFilePath] = useState<string | undefined>();
    const [uploadState, setUploadState] = useState(false)

  const router = useRouter()

    const submitHandler = () => {
        if (session) {

            axios.post('/api/addCompanyDetails', {
                userEmail: session?.user?.email,
                companyName: companyNameRef?.current?.value,
                companyImage: filePath,
                companyLocation: companyLocationRef?.current?.value,
                yearFounded: yearFoundedRef?.current?.value,
                numberOfEmployees: numberOfEmployeesRef?.current?.value
            })
                .then(function (response) {
                    console.log(response?.data);
                    router.push('/bussines/bussines-dashboard')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    return (
        <main className='font-roboto'>
            <nav>
                <Navbar
                    currentPage='bussines'
                />
            </nav>
            <section className='pt-10 text-center px-4'>
                <p className='mb-5'>Bevor Sie Ihre Stellenausschreibungen erstellen können, bitten wir Sie, die folgenden Details zu Ihrer Firma anzugeben.</p>
                <p className='mb-5'>Bitte füllen Sie alle Felder aus und laden Sie Ihr Firmenlogo hoch.</p>
            </section>
            <section className='mb-10'>
                <div className='mb-5'>
                    <div className='text-center mb-1'>
                        <label htmlFor="companyName">Firmenname</label>
                    </div>
                    <div className='flex justify-center'>
                        <input ref={companyNameRef} className='border p-2 flex' type="text" name="companyName" id="companyName" />
                    </div>
                </div>
                <div className='mb-5'>
                    <div className='text-center mb-1'>
                        <label htmlFor="companyLocation">Standort</label>
                    </div>
                    <div className='flex justify-center'>
                        <input ref={companyLocationRef} className='border p-2 flex' type="text" name="companyLocation" id="companyLocation" />
                    </div>
                </div>
                <div className='mb-5'>
                    <div className='text-center mb-1'>
                        <label htmlFor="numberOfEmployees">Anzahl Mitarbeiter</label>
                    </div>
                    <div className='flex justify-center'>
                        <input ref={numberOfEmployeesRef} className='border p-2 flex' type="text" name="numberOfEmployees" id="numberOfEmployees" />
                    </div>
                </div>
                <div className='mb-5'>
                    <div className='text-center mb-1'>
                        <label htmlFor="yearFounded">Gründungsjahr</label>
                    </div>
                    <div className='flex justify-center'>
                        <input ref={yearFoundedRef} className='border p-2 flex' type="number" name="yearFounded" id="yearFounded" />
                    </div>
                </div>
            </section>
            <div>
                {!uploadState ? (
                    <div className='mb-6'>
                        <p className='mb-2 text-center'>Firmenlogo importieren</p>
                        <UploadButton
                            endpoint="companyImageUploader"
                            onClientUploadComplete={(res) => {
                                setFilePath(res && res[0].fileUrl)
                                setUploadState(true)
                                console.log("Files: ", res && res[0].fileUrl);

                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                    </div>
                ) : (
                    <div>
                        <p className='text-center pt-2 '>Hochladen von Firmenlogo <br /> war erfolgreich</p>
                        <svg className='mx-auto mb-7' stroke="#66af99" fill="#66af99" strokeWidth="0" viewBox="0 0 512 512" height="2.5rem" width="2.5rem" xmlns="http://www.w3.org/2000/svg"><path d="M170.718 216.482L141.6 245.6l93.6 93.6 208-208-29.118-29.118L235.2 279.918l-64.482-63.436zM422.4 256c0 91.518-74.883 166.4-166.4 166.4S89.6 347.518 89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082 45.764 6.241L334 63.6C310.082 53.2 284.082 48 256 48 141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208h-41.6z"></path></svg>
                    </div>
                )
                }
            </div>
            <div className='flex justify-center'>
                <button onClick={() => submitHandler()} className='border p-2 rounded-3xl bg-[#66af9a] text-white'>Angaben bestätigen</button>
            </div>
        </main>
    )
}

export default page