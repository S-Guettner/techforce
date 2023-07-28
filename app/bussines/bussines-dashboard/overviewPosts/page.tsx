'use client'
import { FC,useEffect,useState } from 'react'
import BussinesDashboardOverview from '@/app/components/bussinesDashboard/BussinesDashboardOverview'
import Navbar from '@/app/components/Navbar'
import { signIn, signOut, getProviders, useSession, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import Link from 'next/link'
import axios from 'axios'
import DashboardPost from '@/app/components/bussines/DashboardPost'
import { nanoid } from 'nanoid'


interface pageProps {
  
}

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

const page: FC<pageProps> = ({}) => {

  const { data: session } = useSession()
 
  const[postsState,setPostsState] = useState<Post []>()

  useEffect(() => {
    axios.post('/api/postsOverviewDashboard', {
      userEmail: session?.user?.email

    })
      .then(function (response) {
    
        setPostsState(response?.data?.jobPosts)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [session?.user?.email])
  
  return (
    <main>
        <Navbar 
        currentPage='bussines'
        />
        <div className='mb-10'>
          <Link href={'/bussines/bussines-dashboard'}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
          </Link>
        </div>

        <section>
          {postsState && postsState.map((post) => {
            console.log(post)
            return(
              <div key={nanoid()}>
                <DashboardPost 
                  postId={post._id}
                  jobTitle={post.jobTitle}
                  timestamp={post.timestamp}
                />
              </div>
            )
          })}
        </section>
        
    </main>
  )
}

export default page