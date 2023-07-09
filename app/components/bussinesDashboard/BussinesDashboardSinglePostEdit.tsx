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
}

const BussinesDashboardSinglePostEdit: FC<BussinesDashboardSinglePostEditProps> = ({ postId, tasks, requirements, contactPerson, shortJobDescription, detailedJobDescription, jobTitle, offers }) => {

    const [newJobTitle, setNewJobTitle] = useState<string | undefined>("")
    const [newShortJobDescription, setNewShortJobDescription] = useState<string | undefined>("")
    const [newDetailedJobDescription, setNewDetailedJobDescription] = useState<string | undefined>("")

    const [newTasks, setNewTasks] = useState<string[]>([])
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

    }, [jobTitle, shortJobDescription, detailedJobDescription])


    const addItemHandler = (array: string[] | undefined, item: string) => {
        array?.push(item)
        console.log(tasks)
    }

    const removeItemHandler = (array: string[], index: number) => {

        if (array === tasks) {
            const newArr = array?.splice(index, 1)
            setNewTasks(newArr)
        }

        if (array === offers) {
            const newArr = array?.splice(index, 1)
            setNewOffers(newArr)
        }

        if (array === requirements) {
            const newArr = array?.splice(index, 1)
            setNewRequirements(newArr)
        }

    }

    return (
        <main>
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
                
                <button onClick={() => addItemHandler(tasks, "test")}>
                    add task
                </button>


                {tasks && tasks.map((item, index) => {
                    return (
                        <div key={nanoid()} className='flex justify-between'>
                            <p>&#x2022; {item}</p>
                            <button onClick={() => removeItemHandler(tasks, index)}>
                                Remove
                            </button>
                        </div>
                    )
                })}
            </section>
            <section className='border-2 border-black rounded-md'>
                <h3>Offers:</h3>
                <button>add offer</button>
                {offers && offers.map((item, index) => {
                    return (
                        <div key={nanoid()} className='flex justify-between'>
                            <p>&#x2022; {item}</p>
                            <button onClick={() => removeItemHandler(offers, index)}>
                                Remove
                            </button>
                        </div>
                    )
                })}
            </section>
            <section className='border-2 border-black rounded-md'>
                <h3>Requirements:</h3>
                <button>add requirement</button>
                {requirements && requirements.map((item, index) => {
                    return (
                        <div key={nanoid()} className='flex justify-between'>
                            <p>&#x2022; {item}</p>
                            <button onClick={() => removeItemHandler(requirements, index)}>
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