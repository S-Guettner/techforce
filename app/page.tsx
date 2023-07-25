'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import logo from '../public/images/tech-force-high-resolution-logo-color-on-transparent-background.png'
import RegistrationModal from './components/RegistrationModal'
import Navbar from './components/Navbar'
import { signIn, signOut, useSession, getSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Posts from './components/indexPage/Posts'
import { nanoid } from 'nanoid'


interface Post {
  jobTitle: string
  shortJobDescription: string
  detailedJobDescription: string
  tasks: string[]
  offers: string[]
  requirements: string[]
  contactPerson: string
  _id: string
  timestamp: string
}

export default function Home() {

  

  const [registrationClicked, setRegistrationClicked] = useState(false)
  const [loginClicked, setLoginClicked] = useState(false)

  const [posts, setPosts] = useState<Post[]>([])

  const [modalStatus, setModalStatus] = useState(false)

  const router = useRouter();
  const { data: session } = useSession()


  console.log(getSession())

  useEffect(() => {
    const fetchPosts = async () => {
      try {


        const response = await axios.post('/api/allPosts');
        console.log(response)
        setPosts(response?.data?.jobPostings)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPosts()
  }, [])

  console.log(session)


  useEffect(() => {
    console.log(modalStatus, "STATUS MODAL")
  }, [modalStatus])



/*   useEffect(() => {
    if (session) {
      router.push('bussines/bussines-dashboard')
    }
  }, [session, router])
 */

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
          <Link className='underline hover:no-underline' href='bussines'>
            For Employers
          </Link>
        </div>
      </nav>
      <main>
        {posts && posts.map((post) => {
          console.log(post)
          return (
            <Posts
              key={nanoid()}
            />
          )
        })
        }

      </main>
    </div>

  )
}
