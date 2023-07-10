"use client"
import { FC, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'

interface BussinesDashboardSinglePostEditProps {
    postId?: string
    contactPerson?: string
    shortJobDescription?: string
    detailedJobDescription?: string
    jobTitle?: string
    offers?: string[]
    requirements?: string[]
    tasks?: string[]
    setPostId: React.Dispatch<React.SetStateAction<string>>
}

const BussinesDashboardSinglePostEdit: FC<BussinesDashboardSinglePostEditProps> = ({ setPostId, postId, tasks, requirements, contactPerson, shortJobDescription, detailedJobDescription, jobTitle, offers }) => {

    const [newJobTitle, setNewJobTitle] = useState<string | undefined>("")
    const [newShortJobDescription, setNewShortJobDescription] = useState<string | undefined>("")
    const [newDetailedJobDescription, setNewDetailedJobDescription] = useState<string | undefined>("")

    const [newTasks, setNewTasks] = useState<string[] | undefined>([])
    const [newOffers, setNewOffers] = useState<string[]>([])
    const [newRequirements, setNewRequirements] = useState<string[]>([])



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

    }, [jobTitle, shortJobDescription, detailedJobDescription, tasks, offers, requirements])


    const addItemHandler = (array: string[] | undefined, item: string) => {
        const newArray = [...(array || []), item]

        if (array === newTasks) {
            setNewTasks(newArray)
        }

        if (array === newOffers) {
            setNewOffers(newArray)
        }

        if (array === newRequirements) {
            setNewRequirements(newArray)
        }
    }

    console.log(newTasks)

    const removeItemHandler = (array: string[], index: number) => {


        
        if (array === newTasks) {
            const updatedArr = [...newTasks]
            updatedArr.splice(index,1)
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

    return (
        <main>
            <button onClick={() => setPostId("")}>
                <p>&#x2190; Back</p>
            </button>
            <div>
                <p>Change Job Title</p>
                <input onChange={(e) => setNewJobTitle(e.target.value)} type="text" name="newJobTitle" id="newJobTitle" value={newJobTitle} />
            </div>
            <div>
                <p>Change short Job description</p>
                <input onChange={(e) => setNewShortJobDescription(e.target.value)} type="text" name="newJobTitle" id="newJobTitle" value={newShortJobDescription} />
            </div>
            <div>
                <p>Change detailed Job description</p>
                <input onChange={(e) => setNewDetailedJobDescription(e.target.value)} type="text" name="detailedJobDescription" id="detailedJobDescription" value={newDetailedJobDescription} />
            </div>

            <section className='border-2 border-black rounded-md'>

                <h3>Tasks:</h3>

                <button onClick={() => addItemHandler(newTasks, "test")}>
                    add task
                </button>

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

                <button onClick={() => addItemHandler(newOffers, "test")}>
                    add offer
                </button>

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

                <button onClick={() => addItemHandler(newRequirements, "test")}>
                    add requirement
                </button>

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
            <p>{contactPerson}</p>

        </main>
    )
}

export default BussinesDashboardSinglePostEdit