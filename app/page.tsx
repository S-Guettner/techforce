'use client'
import {useState} from 'react'

import Link from 'next/link'
import Image from 'next/image'

import logo  from '../public/images/tech-force-high-resolution-logo-color-on-transparent-background.png'
import LoginModal from './components/LoginModal'
import RegistrationModal from './components/RegistrationModal'


export default function Home() {
  
  const [registrationClicked, setRegistrationClicked] = useState(false)
  const [loginClicked, setLoginClicked] = useState(false)
  
  console.log(registrationClicked)
  console.log(loginClicked)

  return (
    <div>
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
          <button onClick={() => setRegistrationClicked(prev => !prev)} className='mx-2 rounded-lg px-2 bg-[#01bc8d] text-white hover:opacity-40'>
            Registration
          </button>
          <button onClick={() => setLoginClicked(prev => !prev)} className='mx-2 rounded-lg px-2 bg-[#01bc8d] text-white hover:opacity-40'>
            login
          </button>
          <Link className='underline hover:no-underline' href='/bussines'>
          For Employers
          </Link>
        </div>
      </nav>
      <main>
        {loginClicked && !registrationClicked ? <LoginModal /> : ""}

        {registrationClicked && !loginClicked ? <RegistrationModal /> : ""}
      </main>
    </div>

  )
}
