'use client'
import { FC, useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import BussinesDashboardSidebar from '@/app/components/bussinesDashboard/BussinesDashboardSidebar'
import BussinesDashboardNewPost from '@/app/components/bussinesDashboard/BussinesDashboardNewPost'
import BussinesDashboardOverview from '@/app/components/bussinesDashboard/BussinesDashboardOverview'
import axios from 'axios'
import Navbar from '@/app/components/Navbar'
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

const page: FC<pageProps> = ({ }) => {

  const { data: session } = useSession()

  const [postsState, setPostsState] = useState<Post[]>()

  const [detailsCheck, setDetailsCheck] = useState<boolean>()

  const [detailsRedirect, setDetailsRedirect] = useState("")

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
  }, [session])

  useEffect(() => {
    if (session) {
      axios.post('/api/checkUserDetails', {
        userEmail: session?.user?.email
      })
        .then(function (response) {
          console.log(response?.data?.result)
          setDetailsCheck(response?.data?.result)
          if (response?.data?.result){
            setDetailsRedirect("/bussines/bussines-dashboard/newPost")
          }else{
            setDetailsRedirect("/bussines/companyDetails")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }, [session])

  const [registartionState, setRegistrationState] = useState<boolean>(false)

  const router = useRouter();

  /*   useEffect(() => {
      const newBussinesUser = async () => {
        try {
          if (session && session.user && session.user.email) {
            const response = await axios.post('/api/newUser', { userEmail: session.user.email, userType: "bussines" });
            console.log(response);
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      newBussinesUser();
    }, [session]); */



  const [selectedAction, setSelectedAction] = useState("overview")

  return (
    <main>
      <Navbar
        currentPage={"bussines"}
      />
      {/*       <div className='flex justify-center'>
        <Link href={'/bussines/bussines-dashboard/overviewPosts'} className='text-center inline  w-[90%] mt-10 rounded-2xl border border-x-stone-100 p-5 shadow-lg'>Übersicht</Link>
      </div> */}
      <div className='flex justify-center'>
        <Link href={`${detailsRedirect}`} className='text-center inline  w-[90%] mt-10 rounded-2xl border border-x-stone-100 p-5 shadow-lg'>Stelle erstellen</Link>
      </div>
      <section>
        <section>
          {postsState && postsState.map((post) => {
            console.log(post)
            return (
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
      </section>

    </main>
  )
}



export default page