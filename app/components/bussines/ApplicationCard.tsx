import { FC } from 'react'

interface ApplicationCardProps {
    cvPath: string
    emailAdress: string,
    firstName: string,
    lastName: string,
    location: string,
    message: string,
    salaryExpectation: string,
    telephoneNumber: string,
}

const ApplicationCard: FC<ApplicationCardProps> = ({ firstName, lastName, emailAdress, location, telephoneNumber, message, salaryExpectation, cvPath }) => {
    return (
        <section className='p-4'>
            <div className='flex justify-start gap-10'>
                <p>{firstName}</p>
                <p>{lastName}</p>
            </div>
            <div className='flex justify-between'>
                <a className='md:text-lg' href={`mailto:${emailAdress}`}>
                    {emailAdress}
                </a>
                <a className='md:text-lg' href={`tel:${telephoneNumber}`}>
                    {telephoneNumber}
                </a>
            </div>
            <div>
                <p>{location}</p>
            </div>
            <div>
                <p>{message}</p>
            </div>
            <div>
                <p>{salaryExpectation}</p>
            </div>
            <div>
                <a target="_blank" href={cvPath}>Lebenslauf öffnen</a>
            </div>
        </section>
    )
}

export default ApplicationCard