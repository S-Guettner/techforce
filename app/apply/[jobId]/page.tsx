import { FC } from 'react'
import Navbar from '@/app/components/Navbar'

interface pageProps {
    params: { jobId: string }
}

const page: FC<pageProps> = ({ params }) => {

    console.log(params)

    return (
        <div>
            <Navbar />
            <main className='flex justify-center pt-14'>
                <div>
                    <label htmlFor="firstName">Vorname</label>
                    <input className='border p-2 mb-5 block' type="text" name="firstName" id="firstName" />
                    <label htmlFor="lastName">Nachname</label>
                    <input className='border p-2 mb-5 block' type="text" name="lastName" id="lastName" />
                    <label htmlFor="telephoneNumber">Telefon</label>
                    <input className='border p-2 mb-5 block' type="text" name="telephoneNumber" id="telephoneNumber" />
                    <label htmlFor="emailAdress">E-Mail-Adresse</label>
                    <input className='border p-2 mb-5 block' type="text" name="emailAdress" id="emailAdress" />
                    <label htmlFor="location">Wohnort</label>
                    <input className='border p-2 mb-5 block' type="text" name="location" id="location" />
                    <label htmlFor="salaryExpectation">Gehaltsvorstellung</label>
                    <input className='border p-2 mb-5 block' type="text" name="salaryExpectation" id="salaryExpectation" />
                    
                </div>
            </main>
        </div>
    )
}

export default page