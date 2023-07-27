import { FC } from 'react'

interface SmallPostProps {
    jobTitle: string
    setPostId: React.Dispatch<React.SetStateAction<string>>
    postId:string
}

const SmallPost: FC<SmallPostProps> = ({ jobTitle, setPostId, postId }) => {
    return (
        <div className='border rounded-3xl p-5' onClick={() => { setPostId(postId)}}>
            <div className='flex justify-between mb-5'>
                <h2>{jobTitle}</h2>
                <p>LOGO</p>
            </div>
            <p>post id {postId}</p>
            <p>Firmen Name </p>
            <p>Arbeitsort</p>
        </div>
    )
}

export default SmallPost