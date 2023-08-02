"use client"
import { FC, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Navbar from '@/app/components/Navbar'
import Link from 'next/link'
import {useRouter} from 'next/navigation'


interface BussinesDashboardSinglePostEditProps {
    postId?: string
    contactPersonName?: string
    contactPersonNumber?: string
    contactPersonEmail?: string
    detailedJobDescription?: string
    jobTitle?: string
    offers?: string[]
    requirements?: string[]
    tasks?: string[]
    setPostId: React.Dispatch<React.SetStateAction<string>>
    params: { jobId: string };
}

const BussinesDashboardSinglePostEdit: FC<BussinesDashboardSinglePostEditProps> = ({ params }) => {

    const router = useRouter()

    const { data: session } = useSession()

    const [newJobTitle, setNewJobTitle] = useState<string | undefined>("")
    const [newDetailedJobDescription, setNewDetailedJobDescription] = useState<string | undefined>("")
    const [newContactPersonName, setNewContactPersonName] = useState<string | undefined>("")
    const [newContactPersonNumber, setNewContactPersonNumber] = useState<string | undefined>("")
    const [newContactPersonEmail, setNewContactPersonEmail] = useState<string | undefined>("")


    const [newTasks, setNewTasks] = useState<string[]>([])
    const [newOffers, setNewOffers] = useState<string[]>([])
    const [newRequirements, setNewRequirements] = useState<string[]>([])

    const [newTaskValue, setNewTaskValue] = useState<string>("")
    const [newOfferValue, setNewOfferValue] = useState<string>("")
    const [newRequirementValue, setNewRequirementValue] = useState<string>("")


    const [jobTitle, setJobTitle] = useState("")
    const [detailedJobDescription, setDetailedJobDescription] = useState("")
    const [contactPersonName, setContactPersonName] = useState("")
    const [contactPersonNumber, setContactPersonNumber] = useState("")
    const [contactPersonEmail, setContactPersonEmail] = useState("")

    const [tasks, setTasks] = useState<string[]>([])
    const [offers, setOffers] = useState<string[]>([])
    const [requirements, setRequirements] = useState<string[]>([])

    console.log(contactPersonNumber)

    useEffect(() => {
        console.log(session?.user?.email)
        console.log(params.jobId)
        axios.post('/api/singlePostUser', {
            jobId: params.jobId,
            userEmail: session?.user?.email

        })
            .then(function (response) {
                console.log(response)
                setJobTitle(response.data.jobPosting.jobTitle)
                setContactPersonName(response.data.jobPosting.contactPersonName)
                setDetailedJobDescription(response.data.jobPosting.detailedJobDescription)
                setContactPersonNumber(response.data.jobPosting.contactPersonNumber)
                setContactPersonEmail(response.data.jobPosting.contactPersonEmail)
                setTasks(response.data.jobPosting.tasks)
                setOffers(response.data.jobPosting.offers)
                setRequirements(response.data.jobPosting.requirements)
              /*   console.log(response.data.jobPosting.offers) */
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [params.jobId, session?.user?.email])

    useEffect(() => {

        if (jobTitle) {
            setNewJobTitle(jobTitle)
        } else {
            setNewJobTitle("")
        }

        if (detailedJobDescription) {
            setNewDetailedJobDescription(detailedJobDescription)
        } else {
            setNewDetailedJobDescription("")
        }

        if (contactPersonName) {
            setNewContactPersonName(contactPersonName)
        } else {
            setNewContactPersonName("")
        }

        if (contactPersonNumber) {
            setNewContactPersonNumber(contactPersonNumber)
        } else {
            setNewContactPersonNumber("")
        }

        if (contactPersonEmail) {
            setNewContactPersonEmail(contactPersonEmail)
        } else {
            setNewContactPersonEmail("")
        }

        if (tasks) {
            setNewTasks(tasks)
        } else {
            setNewTasks([])
        }

        if (offers) {
            setNewOffers(offers)
        } else {
            setNewOffers([])
        }

        if (requirements) {
            setNewRequirements(requirements)
        } else {
            setNewRequirements([])
        }


    }, [jobTitle, detailedJobDescription, tasks, offers, requirements, contactPersonName, contactPersonNumber, contactPersonEmail])

    console.log(contactPersonName)

    const addItemHandler = (array: string[] | undefined, item: string) => {

        const newArray = [...(array || []), item]

        if (array === newTasks) {
            setNewTasks(newArray);
        }

        if (array === newOffers) {
            setNewOffers(newArray);
        }

        if (array === newRequirements) {
            setNewRequirements(newArray);
        }
    }

    console.log(newTasks)

    const removeItemHandler = (array: string[], index: number) => {

        if (array === newTasks) {
            const updatedArr = [...newTasks]
            updatedArr.splice(index, 1)
            setNewTasks(updatedArr)
            console.log(updatedArr)
        }

        if (array === newOffers) {
            const updatedArr = [...newOffers]
            updatedArr.splice(index, 1)
            setNewOffers(updatedArr)
            console.log(updatedArr)

        }

        if (array === newRequirements) {
            const updatedArr = [...newRequirements]
            updatedArr.splice(index, 1)
            setNewRequirements(updatedArr)
            console.log(updatedArr)
        }

    }

    const submitHandler = () => {

        axios.post('/api/singlePostEdit', {
            userEmail: session?.user?.email,
            postId: params.jobId,
            jobTitle: newJobTitle,
            detailedJobDescription: newDetailedJobDescription,
            tasks: newTasks,
            offers: newOffers,
            requirements: newRequirements,
            contactPersonName: newContactPersonName,
            contactPersonNumber: newContactPersonNumber,
            contactPersonEmail: newContactPersonEmail

        })
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deletePostHandler = () => {
        axios.post('/api/deletePost', {
            postId: params.jobId,
            userEmail: session?.user?.email

        })
            .then(function (response) {
                console.log(response)
                router.push('/bussines/bussines-dashboard')
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    console.log(session?.user?.email)

    return (
        <main>
            <Navbar
                currentPage='bussines'
            />
            {/* ================================================ back button ================================================ */}
            <Link href={'/bussines/bussines-dashboard'}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
            </Link>
            <div className='flex justify-center mb-5'>
                <div >
                    {/* ================================================ Change Job Title ================================================ */}
                    <p>Stellenbezeichnung ändern</p>
                    <input className='border rounded-xl p-2 w-[340px] shadow-inner' onChange={(e) => setNewJobTitle(e.target.value)} type="text" name="newJobTitle" id="newJobTitle" value={newJobTitle} />
                </div>
            </div>
            <div className='flex justify-center mb-5'>
                <div>
                    {/* ================================================ Change detailed Job description ================================================ */}
                    <p>Stellenbeschreibung ändern</p>
                    <textarea className='border rounded-xl p-2 max-h-44 shadow-inner' onChange={(e) => setNewDetailedJobDescription(e.target.value)} value={newDetailedJobDescription} name="detailedJobDescription" id="detailedJobDescription" cols={35} rows={5}></textarea>
                </div>
            </div>

            <section className=' p-1 rounded-md'>
                <div className='bg-[#66af99] h-[.1rem] w-full mb-10'></div>
                <h3 className='text-center mb-5  text-xl'>Aufgaben</h3>
                <div className='flex justify-center '>
                    {/* ================================================ add task ================================================ */}
                    <textarea className='border p-2 rounded-md max-h-44 mb-5  w-[340px] shadow-inner' onChange={(e) => setNewTaskValue(e.target.value)} name="" id="" cols={30} rows={5}></textarea>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#66af99]  rounded-2xl text-white p-2 mb-5' onClick={() => addItemHandler(newTasks, newTaskValue)}>
                        Aufgabe hinzufügen
                    </button>
                </div>
                <div className=' rounded-lg p-2'>
                    {newTasks && newTasks.map((item, index) => {
                        return (
                            <div key={nanoid()} className='flex mb-2 items-center'>
                                <p className='w-3/4'>&#x2022; {item}</p>
                                <button className='bg-red-400 p-1 flex justify-center items-center text-white h-10 w-8 rounded-md ml-5' onClick={() => removeItemHandler(newTasks, index)}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className=''>

                <div className='bg-[#66af99] h-[.1rem] w-full mb-10'></div>

                <h3 className='text-center mb-5  text-xl'>Was wir bieten</h3>

                <div className='flex justify-evenly'>
                    {/* ================================================ add offer ================================================ */}
                    <textarea className='border rounded-xl p-2 max-h-44 shadow-inner mb-5' onChange={(e) => setNewOfferValue(e.target.value)} name="detailedJobDescription" id="detailedJobDescription" cols={35} rows={5}></textarea>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#66af99]  rounded-2xl text-white p-2 mb-5' onClick={() => addItemHandler(newOffers, newOfferValue)}>
                        Angebot hinzufügen
                    </button>
                </div>
                <div className='rounded-lg p-2 '>
                    {newOffers && newOffers.map((item, index) => {
                        return (
                            <div key={nanoid()} className='flex mb-2'>
                                <p className='w-3/4'>&#x2022; {item}</p>
                                <button className='bg-red-400 p-1 flex justify-center items-center text-white h-10 w-8 rounded-md ml-5' onClick={() => removeItemHandler(newOffers, index)}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className=''>

                <div className='bg-[#66af99] h-[.1rem] w-full mb-10'></div>

                <h3 className='text-center mb-5  text-xl'>Anforderungen</h3>

                <div className='flex justify-evenly'>
                    {/* ================================================ add requirement ================================================ */}
                    <textarea className='border rounded-xl p-2 max-h-44 shadow-inner mb-5' onChange={(e) => setNewRequirementValue(e.target.value)} name="detailedJobDescription" id="detailedJobDescription" cols={35} rows={5}></textarea>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-[#66af99]  rounded-2xl text-white p-2 mb-5' onClick={() => addItemHandler(newRequirements, newRequirementValue)}>
                        Anforderung hinzufügen
                    </button>
                </div>
                <div>

                </div>
                <div className='rounded-lg p-2 '>
                    {newRequirements && newRequirements.map((item, index) => {
                        return (
                            <div key={nanoid()} className='flex  mb-2'>
                                <p className='w-3/4'>&#x2022; {item}</p>
                                <button className='bg-red-400 p-1 flex justify-center items-center text-white h-10 w-8 rounded-md ml-5' onClick={() => removeItemHandler(newRequirements, index)}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className=''>
                <div className='bg-[#66af99] h-[.1rem] w-full mb-10'></div>
                {/* ================================================ change contact person ================================================ */}
                <h3 className='text-center mb-5  text-xl'>Kontakt Daten</h3>
                <div className='p-4'>
                    <p className='pl-2'>Name</p>
                    <input className='block m-2 border p-2 rounded-md shadow-inner w-[340px]' onChange={(e) => setNewContactPersonName(e.target.value)} type="text" name="contactPersonName" id="contactPersonName" value={newContactPersonName} />
                    <p className='pl-2'>Nummer</p>
                    <input className='block m-2 border p-2 rounded-md shadow-inner w-[340px]' onChange={(e) => setNewContactPersonNumber(e.target.value)} type="text" name="contactPersonNumber" id="contactPersonNumber" value={newContactPersonNumber} />
                    <p className='pl-2'>Email</p>
                    <input className='block m-2 border p-2 rounded-md shadow-inner w-[340px]' onChange={(e) => setNewContactPersonEmail(e.target.value)} type="text" name="contactPersonEmail" id="contactPersonEmail" value={newContactPersonEmail} />
                </div>
            </section>
            <section className='flex justify-center mb-12'>
                {/* ================================================ submit changes ================================================ */}
                <button onClick={() => submitHandler()} className='bg-[#66af99] w-full text-white p-2 rounded-2xl m-4 hover:opacity-50'>
                    Änderungen speichern
                </button>
                {/* ================================================ delete post ================================================ */}
            </section>
            <div className='bg-red-800 h-[.2rem] w-full mb-5'></div>
            <p className='text-center text-red-700 mb-5'>
                Dieser Vorgang ist nicht wiederrufbar!
            </p>
            <div className='flex justify-center'>

                <button className='bg-red-600 p-2 mb-5 text-white rounded-xl' onClick={() => deletePostHandler()} >
                    Stellenausschreibung löschen
                </button>
            </div>
        </main>
    )
}

export default BussinesDashboardSinglePostEdit