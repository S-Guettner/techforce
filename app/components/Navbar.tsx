'use client'

import { FC } from 'react'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import RegistrationModal from './RegistrationModal'

interface NavbarProps {

}
interface getProviderState {

}

const Navbar: FC<NavbarProps> = () => {

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()
    

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
        <nav>
           
           
           
           
            <button onClick={() => signOut()}>Sign out</button>
                
            
        </nav>
    )
}

export default Navbar