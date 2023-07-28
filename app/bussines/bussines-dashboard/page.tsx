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

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

  const { data: session } = useSession()
  console.log(session)


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
        <div className='flex justify-center'>
          <Link href={'/bussines/bussines-dashboard/overviewPosts'} className='text-center inline  w-[90%] mt-10 rounded-2xl border border-x-stone-100 p-5 shadow-lg'>Übersicht</Link>
        </div>
        <div className='flex justify-center'>
          <Link href={'/bussines/bussines-dashboard/newPost'} className='text-center inline  w-[90%] mt-10 rounded-2xl border border-x-stone-100 p-5 shadow-lg'>Stelle erstellen</Link>
        </div>
        <section>

        </section>

      </main>
    )
  }



export default page