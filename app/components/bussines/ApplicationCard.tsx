import { FC, useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Router from 'next/router'

interface ApplicationCardProps {
    cvPath: string
    emailAdress: string,
    firstName: string,
    lastName: string,
    location: string,
    message: string,
    salaryExpectation: string,
    telephoneNumber: string,
    applicationId: string
    setRerenderState: React.Dispatch<React.SetStateAction<boolean>>
}

const ApplicationCard: FC<ApplicationCardProps> = ({ applicationId, firstName, lastName, emailAdress, location, telephoneNumber, message, salaryExpectation, cvPath, setRerenderState }) => {


    const { data: session } = useSession()
    console.log(session?.user?.email)

    const [favoriteState, setFavoriteState] = useState(false)

    const deleteApplication = () => {
        axios.post('/api/deleteApplication', {
            userEmail: session?.user?.email,
            applicationId: applicationId
        })
            .then(function (response) {
                console.log(response);
                setRerenderState(prev => !prev)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const addToFavorite = () => {
        axios.post('/api/addFavoriteApplication', {
            userEmail: session?.user?.email,
            applicationId: applicationId
        })
            .then(function (response) {
                console.log(response);
                setFavoriteState(prev => !prev)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <section className='p-4 border mb-10'>
            <div className='flex justify-between'>
                <div className='flex justify-start gap-2 items-center'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                </div>
            </div>
            <div className='flex justify-start gap-2 items-center'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
                <a className='md:text-lg' href={`mailto:${emailAdress}`}>
                    {emailAdress}
                </a>
            </div>
            <div className='flex justify-start gap-2 items-center'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 0 1-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 0 0-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 0 0 285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z"></path></svg>
                <a className='md:text-lg' href={`tel:${telephoneNumber}`}>
                    {telephoneNumber}
                </a>

            </div>
            <div className='flex justify-start gap-2 items-center'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 12 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                <p>{location}</p>
            </div>
            <div>
                <p className='p-5 whitespace-pre-line'>{message}</p>
            </div>
            <div className='flex justify-between '>
                <div className='flex justify-start gap-1'>
                    <p>Gehaltsvorstellung:</p>
                    <p>{salaryExpectation}</p>
                    <p>€</p>
                </div>
                <div className='flex items-center gap-2 mb-5'>
                    <a target="_blank" href={cvPath}>
                        <div className='flex gap-2 items-center'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M4.99787498,8.99999999 L4.99787498,0.999999992 L19.4999998,0.999999992 L22.9999998,4.50000005 L23,23 L16,23 M18,1 L18,6 L23,6 M8,11 C6.34325,11 5,12.34325 5,14 C5,15.65675 6.34325,17 8,17 C9.65675,17 11,15.65675 11,14 C11,12.34325 9.65675,11 8,11 L8,11 Z M3,23 L3,22 C3,18 6,17 8,17 C10,17 13,18 13,22 L13,23 L3,23 Z"></path></svg>
                            <p>
                                Lebenslauf öffnen
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div className='flex justify-between px-5'>
                <button onClick={() => deleteApplication()} className='text-white bg-red-400 p-2 rounded-3xl'>löschen</button>

            </div>
        </section>
    )
}

export default ApplicationCard