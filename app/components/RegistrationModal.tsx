'use client'

import { FC } from 'react'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { nanoid } from 'nanoid'
import axios from 'axios'

interface RegistrationModalProps {
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>,
  currentPage:string
}


const RegistrationModal: FC<RegistrationModalProps> = ({ setModalStatus , currentPage}) => {

  const customSignIn = async (provider: string, callbackUrl: string) => {
    return await signIn(provider, { callbackUrl }); // Pass the callbackUrl as part of the options object
  };


  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()

  const [callbackUrl, setCallbackURL] = useState(currentPage)


  const { data: session } = useSession()

  useEffect(() => {
    const providers = async () => {
      const response = await getProviders()
      setProviders(() => response)
    }
    providers()
  }, [])



  return <div className='bg-neutral-600/50 w-screen h-screen absolute pt-11 flex items-center justify-center text-black'>
    <div className='bg-neutral-200 w-1/2 h-3/4 p-4'>

      <div className='flex justify-between'>
        <button onClick={() => setModalStatus(prev => !prev)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg></button>
      </div>

      <section className=''>
        <div className='border-2 border-red-600 p-2'>
          <h3>currently not working!!!!!!</h3>
          <input className='border-2 border-black rounded-md' placeholder='email' type="email" name="" id="" />
          <div className=' w-2/3 flex justify-between cursor-pointer border-2 border-neutral-500 rounded-md p-2 my-2' onClick={() => customSignIn('github' ,`http://localhost:3000/bussines/bussines-dashboard` )}>
            <p>Sign up with email</p>
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
        </div>

        <div className='w-2/3  flex justify-between cursor-pointer border-2 border-neutral-500 rounded-md p-2 my-2' onClick={() => customSignIn('google', `http://localhost:3000/bussines/bussines-dashboard` )}>
          <p>Sign up with google</p>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
        </div>



        <div className='w-2/3  flex justify-between cursor-pointer border-2 border-neutral-500 rounded-md p-2 my-2' onClick={() => signIn('github', { callbackUrl: "http://localhost:3000" })}>
          <p>Sign up with Github</p>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>

        </div>
      </section>



    </div>

  </div>
}

export default RegistrationModal