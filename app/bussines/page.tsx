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
import Navbar from '../components/Navbar'
import HeroImage from '../../public/images/heroImageBussines.jpg'
import TextImage from '../../public/images/registrationImage.jpg'

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

  }, [session, router])



  return (
    <div className='w-screen h-screen font-roboto'>
      <Navbar
        currentPage='registration'
      />
      <main >
        <div className='md:flex justify-center items-center md:gap-5 xl:mx-46'>
          <div className='h-[16.3rem]  w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 bg-hero-pattern bg-no-repeat bg-contain '>
            <h2 className='text-white py-3 text-center pb-4 text-[2.5rem] font-extrabold md:hidden'>Finden Sie IT-Talente, die den Unterschied machen</h2>
          </div>
          <h2 className='hidden md:block text-2xl font-bold w-1/3 2xl:w-1/4'>Finden Sie IT-Talente, die den Unterschied machen</h2>
        </div>
        <section className='my-8'>
          <p className='text-center mb-3 px-8 md:w-2/3 md:mx-auto lg:w-2/4 lg:pt-5 lg:mb-10 2'>Suchen Sie nach IT-Experten, die Ihr Unternehmen voranbringen können? Melden Sie sich heute  kostenlos an und schalten Sie Ihre Stellenanzeigen.</p>
        </section>
        <section className=''>

          <div className='bg-[#66ae9c] text-white'>
            <h3 className='text-center py-8  p-4  mb-8 md:px-20 lg:mb-10 xl:mx-52'>
              Verbinden Sie sich mit qualifizierten Fachkräften, die bereit sind, Ihre Herausforderungen zu meistern und Ihr Geschäft zu transformieren.
            </h3>
            {/*             <section className='bg-[#66ae9c] text-white mb-5 pt-5 text-center text-lg pb-1'>
              <p className='mb-5'>
                Verbinden Sie sich mit qualifizierten Fachkräften, die bereit sind, Ihre Herausforderungen zu meistern und Ihr Geschäft zu transformieren.
              </p>

            </section> */}
          </div>
          <p className='text-center  mb-5 px-4 '>Jetzt registrieren und die Zukunft gestalten!</p>
        </section>
        {/* 
        {modalStatus && <RegistrationModal
          currentPage={"/bussines/bussines-dashboard"}
          setModalStatus={setModalStatus}
        />}
 */}
        {session && <button onClick={() => signOut()}>Sign out</button>}
        {!session &&
          <div className='flex justify-center items-center mb-16'>
            <Link href={'/bussines/registrationPage'} className='text-white border p-2 px-10 rounded-3xl bg-[#66ae9c]'>Kostenlos registrieren</Link>
          </div>
        }





      </main>
    </div>
  )
}

export default page