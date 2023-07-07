import { FC } from 'react'
import { nanoid } from 'nanoid'

interface BussinesDashboardSinglePostEditProps {
    contactPerson?: string
    shortJobDescription?: string
    detailedJobDescription?: string
    jobTitle?: string
    offers?: string[]
    requirements?: string[]
    tasks?: string[]
}

const BussinesDashboardSinglePostEdit: FC<BussinesDashboardSinglePostEditProps> = ({ tasks,requirements, contactPerson, shortJobDescription, detailedJobDescription, jobTitle, offers }) => {
    return (
        <main>
            <p>{jobTitle}</p>
            <p>{shortJobDescription}</p>
            <p>{detailedJobDescription}</p>
            <h3>Tasks:</h3>
            {tasks && tasks.map((item) => {
                return(
                    <p key={nanoid()}>&#x2022; {item}</p>
                )
            })}
            <h3>Offers:</h3>
            {offers && offers.map((item) => {
                return(
                    <p key={nanoid()}>&#x2022; {item}</p>
                )
            })}
            <h3>Requirements:</h3>
            {requirements && requirements.map((item) => {
                return(
                    <p key={nanoid()}>&#x2022; {item}</p>
                )
            })}
            <p>{contactPerson}</p>

        </main>
    )
}

export default BussinesDashboardSinglePostEdit