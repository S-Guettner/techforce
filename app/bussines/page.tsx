import { FC } from 'react'
import logo from '../../public/images/tech-force-high-resolution-logo-color-on-transparent-background.png'
import Image from 'next/image'
import Link from 'next/link'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  return (
    <div >
      <nav className='flex justify-between items-center p-2'>
        <div>
          <Image
            src={logo}
            width={100}
            height={100}
            alt='logo'
          />
        </div>
        <div>
          <button className='mx-2 rounded-lg px-2 bg-[#01bc8d] text-white hover:opacity-40'>login</button>
          <Link className='mx-2 rounded-lg px-2 bg-[#01bc8d] text-white hover:opacity-40' href='/bussines/bussines-registration'>
            Register
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default page