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
import SmallPost from './components/indexPage/SmallPost'



interface Post {
  jobTitle: string
  shortJobDescription: string
  detailedJobDescription: string
  tasks: string[]
  offers: string[]
  requirements: string[]
  contactPersonName: string
  contactPersonNumber: string
  contactPersonEmail: string
  _id: string
  timestamp: string
}

export default function Home() {



  const [registrationClicked, setRegistrationClicked] = useState(false)
  const [loginClicked, setLoginClicked] = useState(false)

  const [posts, setPosts] = useState<Post[]>([])

  const [modalStatus, setModalStatus] = useState(false)

  const [postId,setPostId] = useState("")

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

  console.log(postId)

  /* 
    useEffect(() => {
      const newBussinesUser = async () => {
        try {
          if (session && session.user && session.user.email) {
            const response = await axios.post('/api/newUser', { userEmail: session.user.email, userType: "applicant" });
            console.log(response);
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      newBussinesUser();
    }, [session]);
   */
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

    if(postId.length == 0){
      return (
        <div>
          <Navbar 
            currentPage={""}
          />
          <nav className='flex justify-between items-center p-2'>
    
            <div>
            </div>
          </nav>
          <main className='p-5'>
            <aside className=''>
              {posts && posts.map((post) => {
                console.log(post)
                return (
                  <SmallPost
                    key={nanoid()}
                    jobTitle={post?.jobTitle}
                    postId={post?._id}
                    setPostId={setPostId}
                  />
                )
              })
              }
            </aside>
    
    
          </main>
        </div>
    
      )
    }else{
      return(
        <div>
          <Navbar 
            currentPage={""}
          />
          <nav className='flex justify-between items-center p-2'>

            <div>
            </div>
          </nav>
          <main className='p-5'>
            <aside className=''>
              {posts && posts.map((post) => {
                console.log(post)
                return (
                  <Posts
                    key={nanoid()}
                    jobTitle={post?.jobTitle}
                    shortJobDescription={post?.shortJobDescription}
                    detailedJobDescription={post?.detailedJobDescription}
                    tasks={post?.tasks}
                    offers={post?.offers}
                    requirements={post?.requirements}
                    contactPersonName={post?.contactPersonName}
                    contactPersonNumber={post?.contactPersonNumber}
                    contactPersonEmail={post?.contactPersonEmail}
                    postId={postId}
                    setPostId={setPostId}
                  />
                )
              })
              }
            </aside>


          </main>
        </div>

      )
    }

}
