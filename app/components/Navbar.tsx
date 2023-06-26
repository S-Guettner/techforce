'use client'

import { FC } from 'react'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { nanoid } from 'nanoid'
import axios from 'axios'

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

    console.log(session?.user?.email)

    useEffect(() => {
        
            axios.post('/api/userCheck', {
                email:session?.user?.email
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        
    })
       
    

    return (
        <nav>
            
                
            <nav key={nanoid()}>

                        <button
                            type='button'

                            onClick={() => signIn()}
                        >
                            Sign in
                        </button>

                        <button className='mx-5' type='button'

                            onClick={() => signOut()}>
                                Sign Out
                        </button>

                    </nav>

                
          

            
        </nav>
    )
}

export default Navbar