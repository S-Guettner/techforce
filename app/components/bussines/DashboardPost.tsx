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


    return (
        <main className='px-4'>
            <div className='border rounded-3xl p-4 my-5'>
                <div className='flex justify-between'>
                    <p className='mb-4'>{jobTitle}</p>
                    <p onClick={() => setOpenApplications(prev => !prev)} className='cursor-pointer'>Bewerbungen: {applications.length} </p>
                </div>
                <div className='flex justify-between'>
                    <p>Erstellt am {day}.{month}.{year}</p>
                    <Link href={`/postEdit/${postId}`}>Bearbeiten</Link>
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