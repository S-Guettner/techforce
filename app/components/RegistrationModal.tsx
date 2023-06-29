import { FC } from 'react'

interface RegistrationModalProps {
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationModal: FC<RegistrationModalProps> = ({ setModalStatus }) => {
  return <div className='bg-neutral-600/50 w-screen h-screen absolute pt-11 flex items-center justify-center'>
    <div className='bg-neutral-200 w-1/2 h-3/4 p-4'>

      <div className='flex justify-between'>
        <h2>Sign Up</h2>
        <button onClick={() => setModalStatus(prev => !prev)}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M3,3 L21,21 M3,21 L21,3"></path></svg></button>
      </div>
      <div>Sign up with email</div>
      <div>sign up with google</div>
      <div>sign up with github</div>
    </div>

  </div>
}

export default RegistrationModal