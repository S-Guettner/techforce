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

    useEffect(() => {
        const providers = async () => {
            const response = await getProviders()
            setProviders(() => response)
        }
        providers()
    }, [])

    return (
        <nav>
            {providers && Object.values(providers).map((provider) => {
                return (

                    <button
                    type='button'
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    >
                        Sign in
                    </button>

                )
            })}
        </nav>
    )
}

export default Navbar