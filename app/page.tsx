'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import logo from '../public/images/tech-force-high-resolution-logo-color-on-transparent-background.png'
import RegistrationModal from './components/RegistrationModal'
import Navbar from './components/Navbar'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'

export default function Home() {

  const [registrationClicked, setRegistrationClicked] = useState(false)
  const [loginClicked, setLoginClicked] = useState(false)


  const [modalStatus, setModalStatus] = useState(false)

  useEffect(() => {
    console.log(modalStatus, "STATUS MODAL")
  }, [modalStatus])

  const { data: session } = useSession()
  console.log(session)

 
  useEffect(() => {
    if (session) {
      window.location.href = 'bussines/bussines-dashboard'
    }
  },[session])


  return (
    <div>
      <Navbar />
      <nav className='flex justify-between items-center p-2'>
        <div>
          <Image
            src={logo}
            width={100}
            height={100}
            alt='logo'
          />
        </div>
        <div>
          {/*           <button onClick={() => setRegistrationClicked(prev => !prev)} className='mx-2 rounded-lg px-2 bg-[#01bc8d] text-white hover:opacity-40'>
            Registration
          </button>
          <button onClick={() => setLoginClicked(prev => !prev)} className='mx-2 rounded-lg px-2 bg-[#01bc8d] text-white hover:opacity-40'>
            login
          </button> */}
          <Link className='underline hover:no-underline' href='bussines'>
            For Employers
          </Link>
        </div>
      </nav>
      <main>

        {modalStatus && <RegistrationModal 
          setModalStatus={setModalStatus}
        />}


        <button onClick={() => { setModalStatus(prev => !prev) }}>
          Sign up
        </button>
      </main>
    </div>

  )
}
