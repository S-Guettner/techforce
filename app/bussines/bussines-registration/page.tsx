import { FC } from 'react'
import Image from 'next/image'
import logo from '../../../public/images/tech-force-high-resolution-logo-color-on-transparent-background.png'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  return (
    <div>
      <nav className='flex justify-between items-center p-2'>
        <div>
          <Image
            src={logo}
            width={100}
            height={100}
            alt='logo'
          />
        </div>
        <div className='flex justify-between gap-10'>
          <button className='mx-2 rounded-lg px-2 bg-[#01bc8d] text-white hover:opacity-40'>login</button>
        </div>
      </nav>
      <main>
        <div>
          <label htmlFor="firstName">First name</label>
          <input className='border-2 border-[#01bc8d] ' type="text" name="firstName" id="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">last name</label>
          <input className='border-2 border-[#01bc8d]' type="text" name="lastName" id="lastName" />
        </div>
        <div>
          <label htmlFor="mailAdress">e-mail</label>
          <input className='border-2 border-[#01bc8d]' type="text" name="mailAdress" id="mailAdress" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input className='border-2 border-[#01bc8d]' type="text" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className='border-2 border-[#01bc8d]' type="text" name="confirmPassword" id="confirmPassword" />
        </div>
        {/* 
        <label htmlFor=""></label>     
        <input type="text" name="" id="" />      

        <label htmlFor=""></label> 
        <input type="text" name="" id="" />    
        <label htmlFor=""></label>    
        <input type="text" name="" id="" />         */}
      </main>
    </div>
  )
}

export default page