'use client'
import { FC, useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BussinesDashboardSidebar from '@/app/components/bussinesDashboard/BussinesDashboardSidebar'
import BussinesDashboardNewPost from '@/app/components/bussinesDashboard/BussinesDashboardNewPost'
import BussinesDashboardOverview from '@/app/components/bussinesDashboard/BussinesDashboardOverview'
import axios from 'axios'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

  const { data: session } = useSession()
  console.log(session)

  const router = useRouter();

  /* useEffect(() => {
    const newBussinesUser = async () => {
      try {


        const response = await axios.post('/api/newBussinesUser', { userEmail: session?.user?.email, userType: "bussines"});
        console.log(response)
        
      } catch (err) {
        console.log(err)
      }
    }

    newBussinesUser()
  }, [session])
  */



  const [selectedAction, setSelectedAction] = useState("overview")


  return (
    <main>
      <div className='flex justify-between'>
        <p>
          Company dashboard
        </p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>

      <main className='flex'>
        <div className='bg-neutral-300 w-1/6 h-screen'>
          <BussinesDashboardSidebar
            setSelectedAction={setSelectedAction}
          />
        </div>
        <div className='bg-neutral-200 w-5/6 text-black'>
          {selectedAction === "new-post" ? <BussinesDashboardNewPost /> : selectedAction === "overview" ? <BussinesDashboardOverview /> : ""}
        </div>
      </main>


    </main>
  )
}

export default page