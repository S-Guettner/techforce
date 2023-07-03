'use client'
import { FC, useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import BussinesDashboardSidebar from '@/app/components/bussinesDashboard/BussinesDashboardSidebar'
import BussinesDashboardNewPost from '@/app/components/bussinesDashboard/BussinesDashboardNewPost'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

  const { data: session } = useSession()
  console.log(session)

  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session, router])

  const [selectedAction, setSelectedAction] = useState("new-post")


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
          <h1>{selectedAction}</h1>
          {selectedAction === "new-post" ? <BussinesDashboardNewPost /> : "more options in progress"}
        </div>
      </main>


    </main>
  )
}

export default page