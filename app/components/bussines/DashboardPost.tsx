'use client'
import { FC, useState } from 'react'
import Link from 'next/link'
import { nanoid } from 'nanoid'
import ApplicationCard from './ApplicationCard'

type Applications = {
    cvPath: string
    emailAdress: string,
    firstName: string,
    lastName: string,
    location: string,
    message: string,
    salaryExpectation: string,
    telephoneNumber: string,
    _id: string
}

interface DashboardPostProps {
    postId: string
    jobTitle: string
    timestamp: string
    applications: Applications[]
    setRerenderState: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardPost: FC<DashboardPostProps> = ({ postId, jobTitle, timestamp, applications, setRerenderState }) => {

    const year = timestamp.slice(0, 4)
    const month = timestamp.slice(5, 7)
    const day = timestamp.slice(8, 10)

    const [openApplications, setOpenApplications] = useState(false)

    const openHandler = () => {
        
    }

    return (
        <main className='px-4'>
            <div className='border rounded-3xl p-4 my-5'>
                <div className='flex justify-between'>
                    <p className='mb-4'>{jobTitle}</p>
                    <div >
                        <div onClick={() => setOpenApplications(prev => !prev)} className='flex items-center cursor-pointer border p-2 rounded-3xl mb-4'>
                            <svg className={`${openApplications && applications.length > 0 ? 'transform rotate-180' : ''} transition duration-500`} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 4H18V6H6zM12 20.414L18.707 13.707 17.293 12.293 13 16.586 13 8 11 8 11 16.586 6.707 12.293 5.293 13.707z"></path></svg>
                            <p>Bewerbungen</p>
                            <p className='flex justify-center ml-1'>{applications.length} </p>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L16,23 M18,1 L18,6 L23,6 M8,11 C6.34325,11 5,12.34325 5,14 C5,15.65675 6.34325,17 8,17 C9.65675,17 11,15.65675 11,14 C11,12.34325 9.65675,11 8,11 L8,11 Z M3,23 L3,22 C3,18 6,17 8,17 C10,17 13,18 13,22 L13,23 L3,23 Z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p>{day}.{month}.{year}</p>
                    <Link href={`/postEdit/${postId}`}>Stelle bearbeiten</Link>
                </div>
            </div>
            <section>
                {openApplications && applications.map((application) => (
                    <ApplicationCard
                        key={nanoid()}
                        firstName={application?.firstName}
                        lastName={application?.lastName}
                        emailAdress={application?.emailAdress}
                        location={application?.location}
                        telephoneNumber={application?.telephoneNumber}
                        message={application?.message}
                        salaryExpectation={application?.salaryExpectation}
                        cvPath={application?.cvPath}
                        applicationId={application?._id}
                        setRerenderState={setRerenderState}

                    />
                ))}
            </section>
        </main>
    )
}

export default DashboardPost