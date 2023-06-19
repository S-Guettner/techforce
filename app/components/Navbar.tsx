'use client'

import { FC } from 'react'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

interface NavbarProps {

}
interface getProviderState {

}

const Navbar: FC<NavbarProps> = () => {

    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()
    console.log(providers)

    const { data: session } = useSession()

    useEffect(() => {
        const providers = async () => {
            const response = await getProviders()
            setProviders(() => response)
        }
        providers()
    }, [])

    console.log(session)

    
        const signInHandler = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/userCheck', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: session?.user?.email,

                    }),
                });

            } catch (err) {
                console.log(err)
            }
        }
    

    return (
        <nav>
            {providers && Object.values(providers).map((provider) => {
                return (
                    <nav key={provider.id}>

                        <button
                            type='button'

                            onClick={() => signInHandler}
                        >
                            Sign in
                        </button>

                        <button className='mx-5' type='button'

                            onClick={() => signOut()}>
                                Sign Out
                        </button>

                    </nav>

                )
            })}
        </nav>
    )
}

export default Navbar