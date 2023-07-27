'use client'
import { FC } from 'react'
import { useEffect, useState } from 'react'
import logo from '../../public/images/tech-force-high-resolution-logo-color-on-transparent-background.png'
import Image from 'next/image'
import Link from 'next/link'
import RegistrationModal from '../components/RegistrationModal'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { useRouter } from 'next/navigation'


interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

  const [modalStatus, setModalStatus] = useState(false)
  const router = useRouter();
  useEffect(() => {
    console.log(modalStatus, "STATUS MODAL")
  }, [modalStatus])

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()


  const { data: session } = useSession()

  useEffect(() => {
    const providers = async () => {
      const response = await getProviders()
      setProviders(() => response)
    }
    providers()
  }, [])

  console.log(session)
  useEffect(() => {
    if (session) {
      router.push('bussines/bussines-dashboard')
    }

  }, [session,router]) 



  return (
    <div >
      <main>

        {modalStatus && <RegistrationModal
          currentPage={"/bussines/bussines-dashboard"}
          setModalStatus={setModalStatus}
        />}

        {session && <button onClick={() => signOut()}>Sign out</button>}
        {!session && <button onClick={() => setModalStatus(prev => !prev)}>Sign in</button>}





      </main>
    </div>
  )
}

export default page