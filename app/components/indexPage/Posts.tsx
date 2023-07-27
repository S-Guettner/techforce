import { FC } from 'react'
import { nanoid } from 'nanoid'

interface PostsProps {
  jobTitle: string,
  shortJobDescription: string,
  detailedJobDescription: string,
  contactPersonName: string,
  contactPersonNumber: string,
  contactPersonEmail: string,
  tasks: string[],
  offers: string[],
  requirements: string[],
  postId: string,
  setPostId: React.Dispatch<React.SetStateAction<string>>

}

const Posts: FC<PostsProps> = (
  {
    jobTitle,
    shortJobDescription,
    detailedJobDescription,
    tasks,
    offers,
    requirements,
    contactPersonName,
    contactPersonNumber,
    contactPersonEmail,
    postId,
    setPostId
  }
) => {
  return (
    <div className='m-10 p-5 border rounded-3xl'>
      <h3 className='text-2xl mb-10'>{jobTitle}</h3>
      <p>{shortJobDescription}</p>
      <p className='mb-10'>{detailedJobDescription}</p>

      <div className='mb-10'>
        <h4 className='text-xl mb-5'>Aufgaben:</h4>
        {tasks && tasks.map((task) => {
          return (
            <div key={nanoid()} className='flex'>
              <p className='mr-2'>&#8226;</p>
              <p>{task}</p>
            </div>
          )
        })}
      </div>

      <div className='mb-10'>
        <h4 className='text-xl mb-5'>Was wir bieten:</h4>
        {offers && offers.map((offer) => {
          return (
            <div key={nanoid()} className='flex'>
              <p className='mr-2'>&#8226;</p>
              <p>{offer}</p>
            </div>
          )
        })}
      </div>

      <div className='mb-10'>
        <h4 className='text-xl mb-5'>Qualifikationen:</h4>
        {requirements && requirements.map((requirement) => {
          return (
            <div key={nanoid()} className='flex'>
              <p className='mr-2'>&#8226;</p>
              <p>{requirement}</p>
            </div>
          )
        })}
      </div>

      <p>Kontakt:</p>
      <p>{contactPersonName}</p>
      <p>{contactPersonNumber}</p>
      <p>{contactPersonEmail}</p>
    </div>
  )
}

export default Posts