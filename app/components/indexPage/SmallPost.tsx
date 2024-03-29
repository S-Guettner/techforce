import { FC } from 'react'
import Image from 'next/image'

interface SmallPostProps {
    jobTitle: string
    setPostId: React.Dispatch<React.SetStateAction<string>>
    postId: string
    companyName: string
    companyImage: string
    companyLocation: string
    yearFounded: string
    numberOfEmployees: string
}

const SmallPost: FC<SmallPostProps> = ({ jobTitle, setPostId, postId, companyName, companyImage, companyLocation, yearFounded, numberOfEmployees }) => {
    return (
        <div className='border rounded-3xl p-2 my-5 cursor-pointer font-roboto' onClick={() => { setPostId(postId) }}>
            <div className='flex justify-between items-center mb-5'>
                <h2>{jobTitle}</h2>
                <Image
                    src={companyImage}
                    width={100}
                    height={100}
                    alt='logo'
                />
            </div>
            <div className='flex justify-between pb-2'>
                <div className='flex items-center gap-1'>
                    <p>{companyName}</p>
                </div>
                <div className='flex justify-between   items-center'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M12,22 C12,22 4,16 4,10 C4,5 8,2 12,2 C16,2 20,5 20,10 C20,16 12,22 12,22 Z M12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 L12,13 Z"></path></svg>
                    <p className='text-right'>{companyLocation.split(",")[0]}</p>
                </div>
            </div>
        </div>
    )
}

export default SmallPost