"use client"
import { FC, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import axios from 'axios'

interface BussinesDashboardSinglePostEditProps {
    postId?: string
    contactPersonName?: string
    shortJobDescription?: string
    detailedJobDescription?: string
    jobTitle?: string
    offers?: string[]
    requirements?: string[]
    tasks?: string[]
    setPostId: React.Dispatch<React.SetStateAction<string>>
}

const BussinesDashboardSinglePostEdit: FC<BussinesDashboardSinglePostEditProps> = ({ setPostId, postId, tasks, requirements, contactPersonName, shortJobDescription, detailedJobDescription, jobTitle, offers }) => {

    const { data: session } = useSession()

    const [newJobTitle, setNewJobTitle] = useState<string | undefined>("")
    const [newShortJobDescription, setNewShortJobDescription] = useState<string | undefined>("")
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

    useEffect(() => {

        if (jobTitle) {
            setNewJobTitle(jobTitle)
        } else {
            setNewJobTitle("")
        }

        if (shortJobDescription) {
            setNewShortJobDescription(shortJobDescription)
        } else {
            setNewShortJobDescription("")
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

        
    }, [jobTitle, shortJobDescription, detailedJobDescription, tasks, offers, requirements, contactPersonName])
    
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
            postId,
            jobTitle: newJobTitle,
            shortJobDescription: newShortJobDescription,
            detailedJobDescription: newDetailedJobDescription,
            tasks: newTasks,
            offers: newOffers,
            requirements: newRequirements,
            contactPersonName: newContactPersonName

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
            postId,
            userEmail: session?.user?.email
            
        })
        .then(function (response) {
            console.log(response)
            setPostId("")
        })
        .catch(function(error) {
            console.log(error)
        })
    }
    console.log(session?.user?.email)

    return (
        <main>
            {/* ================================================ back button ================================================ */}
            <button onClick={() => setPostId("")}>
                <p>&#x2190; Back</p>
            </button>
            <div>
            {/* ================================================ Change Job Title ================================================ */}
                <p>Change Job Title</p>
                <input onChange={(e) => setNewJobTitle(e.target.value)} type="text" name="newJobTitle" id="newJobTitle" value={newJobTitle} />
            </div>
            <div>
            {/* ================================================ Change short Job description ================================================ */}
                <p>Change short Job description</p>
                <input onChange={(e) => setNewShortJobDescription(e.target.value)} type="text" name="newJobTitle" id="newJobTitle" value={newShortJobDescription} />
            </div>
            <div>
            {/* ================================================ Change detailed Job description ================================================ */}
                <p>Change detailed Job description</p>
                <input onChange={(e) => setNewDetailedJobDescription(e.target.value)} type="text" name="detailedJobDescription" id="detailedJobDescription" value={newDetailedJobDescription} />
            </div>

            <section className='border-2 border-black rounded-md'>

                <h3>Tasks:</h3>
                <div className='flex justify-evenly'>
            {/* ================================================ add task ================================================ */}
                    <input onChange={(e) => setNewTaskValue(e.target.value)} type="text" name="addTask" id="addTask" placeholder='new task' />
                    <button className='bg-blue-900 rounded-2xl text-white p-2' onClick={() => addItemHandler(newTasks, newTaskValue)}>
                        add task
                    </button>
                </div>

                {newTasks && newTasks.map((item, index) => {
                    return (
                        <div key={nanoid()} className='flex justify-between'>
                            <p>&#x2022; {item}</p>
                            <button onClick={() => removeItemHandler(newTasks, index)}>
                                Remove
                            </button>
                        </div>
                    )
                })}
            </section>
            <section className='border-2 border-black rounded-md'>

                <h3>Offers:</h3>

                <div className='flex justify-evenly'>
            {/* ================================================ add offer ================================================ */}
                    <input onChange={(e) => setNewOfferValue(e.target.value)} type="text" name="addOffer" id="addOffer" placeholder='new offer' />
                    <button className='bg-blue-900 rounded-2xl text-white p-2' onClick={() => addItemHandler(newOffers, newOfferValue)}>
                        add offer
                    </button>
                </div>

                {newOffers && newOffers.map((item, index) => {
                    return (
                        <div key={nanoid()} className='flex justify-between'>
                            <p>&#x2022; {item}</p>
                            <button onClick={() => removeItemHandler(newOffers, index)}>
                                Remove
                            </button>
                        </div>
                    )
                })}
            </section>
            <section className='border-2 border-black rounded-md'>

                <h3>Requirements:</h3>

                <div className='flex justify-evenly'>
            {/* ================================================ add requirement ================================================ */}    
                    <input onChange={(e) => setNewRequirementValue(e.target.value)} type="text" name="addOffer" id="addOffer" placeholder='new offer' />
                    <button className='bg-blue-900 rounded-2xl text-white p-2' onClick={() => addItemHandler(newRequirements, newRequirementValue)}>
                        add requirement
                    </button>
                </div>

                {newRequirements && newRequirements.map((item, index) => {
                    return (
                        <div key={nanoid()} className='flex justify-between'>
                            <p>&#x2022; {item}</p>
                            <button onClick={() => removeItemHandler(newRequirements, index)}>
                                Remove
                            </button>
                        </div>
                    )
                })}
            </section>
            <section className='border-2 border-black rounded-md'>
            {/* ================================================ change contact person ================================================ */}
                <p>Contact Person:</p>
                <input onChange={(e) => setNewContactPersonName(e.target.value)} type="text" name="contactPerson" id="contactPerson" value={newContactPersonName} />
            </section>
            <section>
            {/* ================================================ submit changes ================================================ */}
                <button onClick={() => submitHandler()} className='bg-blue-900 text-white p-2 rounded-2xl m-4 hover:opacity-50'>
                    Submit Changes
                </button>
            {/* ================================================ delete post ================================================ */}
                <button onClick={() => deletePostHandler()} >
                    Delete Post
                </button>
            </section>
        </main>
    )
}

export default BussinesDashboardSinglePostEdit