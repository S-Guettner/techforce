import { FC } from 'react'

interface BussinesDashboardOverviewPostsProps {
    jobTitle:string,
    timeStamp:string
    setPostId: React.Dispatch<React.SetStateAction<string>>
    postId:string
}

const BussinesDashboardOverviewPosts: FC<BussinesDashboardOverviewPostsProps> = ({ jobTitle, timeStamp,postId, setPostId }) => {
  
    const year = timeStamp.slice(0,4)
    const month = timeStamp.slice(5, 7)
    const day = timeStamp.slice(8,10)
  
    return (
        <button onClick={() => setPostId(postId)} className='flex justify-between px-2 border-2 border-black rounded-md my-4'>
        <p className='inline'>{jobTitle}</p>
        <p className='inline'>Created at {day}:{month}:{year}</p>
    </button>
  )
}

export default BussinesDashboardOverviewPosts