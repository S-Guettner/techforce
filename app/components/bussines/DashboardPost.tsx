import { FC } from 'react'

interface DashboardPostProps {
    postId: string
    jobTitle: string
    timestamp:string
}

const DashboardPost: FC<DashboardPostProps> = ({ postId, jobTitle, timestamp }) => {
    
    const year = timestamp.slice(0, 4)
    const month = timestamp.slice(5, 7)
    const day = timestamp.slice(8, 10)

    
    return (
        <div>
            <p>{jobTitle}</p>
            <p>Erstellt am {day}.{month}.{year}</p>
        </div>
    )
}

export default DashboardPost