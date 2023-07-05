import { FC } from 'react'

interface BussinesDashboardOverviewPostsProps {
    jobTitle:string,
    timeStamp:string
}

const BussinesDashboardOverviewPosts: FC<BussinesDashboardOverviewPostsProps> = ({ jobTitle, timeStamp }) => {
  
    const year = timeStamp.slice(0,4)
    const month = timeStamp.slice(5, 7)
    const day = timeStamp.slice(8,10)
  
    return (
    <main className='flex justify-between px-2'>
        <p className='inline'>{jobTitle}</p>
        <p className='inline'>Created at {day}:{month}:{year}</p>
    </main>
  )
}

export default BussinesDashboardOverviewPosts