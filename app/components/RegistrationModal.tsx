import { FC } from 'react'

interface RegistrationModalProps {
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const RegistrationModal: FC<RegistrationModalProps> = ({ setModalStatus }) => {
  return <div className='bg-slate-600 w-screen h-screen absolute'>
    <h1>RegistrationModal</h1>
    <button onClick={() => setModalStatus(prev => !prev)}>CLOSE</button>

  </div>
}

export default RegistrationModal