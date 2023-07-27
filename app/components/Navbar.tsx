'use client'

import { FC } from 'react'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import RegistrationModal from './RegistrationModal'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/images/new-logo.png'

interface NavbarProps {

}
interface getProviderState {

}

const Navbar: FC<NavbarProps> = () => {

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()
    const [modalStatus, setModalStatus] = useState(false)

    const { data: session } = useSession()



    useEffect(() => {
        const providers = async () => {
            const response = await getProviders()
            setProviders(() => response)
        }
        providers()
    }, [])

    /* console.log(session) */

    /*    console.log(session?.user?.email)
   
       useEffect(() => {
           
               axios.post('/api/userCheck', {
                   userEmail:session?.user?.email
               })
                   .then(function (response) {
                       console.log(response);
                   })
                   .catch(function (error) {
                       console.log(error);
                   });
           
       }, [session]) */



    return (
        <nav className='flex items-center p-5 justify-between'>
            <div>
                <Image
                    src={logo}
                    width={170}
                    height={170}
                    alt='logo'
                />
            </div>

            <Link className='underline hover:no-underline' href='bussines'>
                <p className='font-light'>
                    Für Arbeitgeber
                </p>
            </Link>

        </nav>
    )
}

export default Navbar