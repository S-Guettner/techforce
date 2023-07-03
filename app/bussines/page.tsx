'use client'
import { FC } from 'react'
import { useEffect, useState } from 'react'
import logo from '../../public/images/tech-force-high-resolution-logo-color-on-transparent-background.png'
import Image from 'next/image'
import Link from 'next/link'
import RegistrationModal from '../components/RegistrationModal'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {

  const [modalStatus, setModalStatus] = useState(false)

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
      window.location.href = 'bussines/bussines-dashboard'
    }

  }, [session])

  return (
    <div >
      <main>

        {modalStatus && <RegistrationModal
          setModalStatus={setModalStatus}
        />}

        {session && <button onClick={() => signOut()}>Sign out</button>}
        {!session && <button onClick={() => setModalStatus(prev => !prev)}>Sign in</button>}





      </main>
    </div>
  )
}

export default page