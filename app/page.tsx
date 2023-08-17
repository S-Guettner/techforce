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
import PostsFilter from './components/indexPage/PostsFilter'



interface CompanyDetails {
  companyName: string;
  companyImage: string;
  companyLocation: string;
  yearFounded: string;
  numberOfEmployees: string;
}

interface Post {
  jobTitle: string;
  shortJobDescription: string;
  detailedJobDescription: string;
  tasks: string[];
  offers: string[];
  requirements: string[];
  contactPersonName: string;
  contactPersonNumber: string;
  contactPersonEmail: string;
  _id: string;
  timestamp: string;
  location:string
  companyDetails: CompanyDetails;
}


export default function Home() {



  const [registrationClicked, setRegistrationClicked] = useState(false)
  const [loginClicked, setLoginClicked] = useState(false)

  const [posts, setPosts] = useState<Post[]>([])

  const [modalStatus, setModalStatus] = useState(false)

  const [postId, setPostId] = useState("")
  const [singlePost, setSinglePost] = useState<Post>()

  const router = useRouter();
  const { data: session } = useSession()

  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  
  
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [radius, setRadius] = useState<number | string>()





 /*  console.log(getSession()) */


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log(searchTerm)


        const response = await axios.post('/api/allPosts', { searchTerm: searchTerm, longitude: longitude, latitude: latitude, radius: radius });
        setPosts(response?.data?.jobPostings)
        console.log(radius)
      } catch (err) {
        console.log(err)
      }
    }

    fetchPosts()
  }, [searchTerm, longitude, latitude, radius])

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.post('/api/singlePostApply', { jobId: postId });

        setSinglePost(response?.data?.jobPosting)

      } catch (err) {
        console.log(err)
      }
    }
    fetchSinglePost()
  }, [postId])


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
  

/* 
  useEffect(() => {
    console.log(modalStatus, "STATUS MODAL")
  }, [modalStatus])
 */


  /*   useEffect(() => {
      if (session) {
        router.push('bussines/bussines-dashboard')
      }
    }, [session, router])
   */

  if (postId.length == 0) {
    return (
      <div>
        <Navbar
          currentPage={"user"}
        />
        <nav className='flex justify-between items-center p-2'>

          <div>
          </div>
        </nav>

        <section className='p-5 flex justify-center'>
          <PostsFilter
            key={nanoid()}
            setSearchTerm={setSearchTerm}
            setLocation={setLocation}
            setLongitude={setLongitude}
            setLatitude={setLatitude}
            setRadius={setRadius}
          />
        </section>
        <div className='h-[1px] bg-[#b2d7cc]'>

        </div>

        <main className='p-5'>
          <aside className=''>
            {posts && posts.map((post) => {
              return (
                <SmallPost
                  key={nanoid()}
                  jobTitle={post?.jobTitle}
                  postId={post?._id}
                  setPostId={setPostId}
                  companyName={post?.companyDetails?.companyName}
                  companyImage={post?.companyDetails?.companyImage}
                  companyLocation={post?.location}
                  yearFounded={post?.companyDetails?.yearFounded}
                  numberOfEmployees={post?.companyDetails?.numberOfEmployees}
                />
              )
            })}
          </aside>


        </main>
      </div>

    )
  } else {
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
          <aside>

            {singlePost && (
              <Posts
                key={nanoid()}
                jobTitle={singlePost?.jobTitle}
                shortJobDescription={singlePost?.shortJobDescription}
                detailedJobDescription={singlePost?.detailedJobDescription}
                tasks={singlePost?.tasks}
                offers={singlePost?.offers}
                requirements={singlePost?.requirements}
                contactPersonName={singlePost?.contactPersonName}
                contactPersonNumber={singlePost?.contactPersonNumber}
                contactPersonEmail={singlePost?.contactPersonEmail}
                postId={postId}
                setPostId={setPostId}
              />
            )}



          </aside>


        </main>
      </div>

    )
  }

}
