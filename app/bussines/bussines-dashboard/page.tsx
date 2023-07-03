'use client'
import { FC, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  
  const { data: session } = useSession()
  console.log(session)
  
  const router = useRouter();
  useEffect(() => {
    if(!session){
      router.push('/')
    }
  }, [session,router]) 
  


  return <div>
    Company dashboard
    <button onClick={() => signOut()}>Sign out</button>
    </div>
}

export default page