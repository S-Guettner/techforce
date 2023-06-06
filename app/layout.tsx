"use client"


import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'tech-force',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  const session = {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    accessToken: 'sample-access-token',
    expires: '2023-12-31',
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
