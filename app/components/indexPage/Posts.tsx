import { FC, useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'

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
    setPostId,
  }
) => {

  const [applyState, useApplyState] = useState(false)

  const [companyImage, setCompanyImage] = useState()

  console.log(applyState)

  useEffect(() => {
    axios.post('/api/companyDetailsSinglePost', {
      postId: postId
    })
      .then(function (response) {
        console.log(response?.data?.companyImage);
        setCompanyImage(response?.data?.companyImage)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  if (!useApplyState) {

  }
  return (
    <div className=' p-2 py-4 border rounded-3xl'>
      <div className='mb-5' onClick={() => { setPostId("") }}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd"></path><path fillRule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clipRule="evenodd"></path></svg>
      </div>
      <div>
        <h3 className='text-2xl mb-5'>{jobTitle}</h3>
        {companyImage &&
          <Image
          className='mb-5'
            src={companyImage}
            alt="Company Image"
            width={150}
            height={150}
          />
        }
      </div>
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
      <div className='flex justify-between items-center'>
        <div className='mb-5'>
          <h4 className='text-xl mb-2'>Kontakt:</h4>
          <p>{contactPersonName}</p>
          <a className='block' href={`tel:${contactPersonNumber}`}>{contactPersonNumber}</a>
          <a href={`mailto:${contactPersonEmail}`}>{contactPersonEmail}</a>
        </div>
      </div>
      <div className='flex justify-center'>
        <Link href={`apply/${postId}`} onClick={() => useApplyState(prev => !prev)} className='border rounded-3xl p-2 bg-[#66af99] text-white text-center'>
          Jetzt bewerben
        </Link>
      </div>
    </div>
  )
}

export default Posts