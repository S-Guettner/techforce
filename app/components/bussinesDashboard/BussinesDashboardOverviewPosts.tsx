import { FC } from 'react'

interface BussinesDashboardOverviewPostsProps {
    jobTitle:string,
    timeStamp:string
}

const BussinesDashboardOverviewPosts: FC<BussinesDashboardOverviewPostsProps> = ({ jobTitle, timeStamp }) => {
  
    const year = timeStamp.slice(0,4)
    const month = timeStamp.slice(5, 7)
    const day = timeStamp.slice(8,10)
    console.log(year)
  
    return (
    <main>
          <p>{jobTitle}</p>
            <p>Created at {day}:{month}:{year}</p>
    </main>
  )
}

export default BussinesDashboardOverviewPosts