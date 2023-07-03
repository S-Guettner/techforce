'use client'
import { FC, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  
  const { data: session } = useSession()
  console.log(session)
  
  useEffect(() => {
    if(!session){
      window.location.href = '/'
    }
  }, [session]) 
  


  return <div>
    Company dashboard
    <button onClick={() => signOut()}>Sign out</button>
    </div>
}

export default page