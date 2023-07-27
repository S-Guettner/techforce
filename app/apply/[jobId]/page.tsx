import { FC } from 'react'
import Navbar from '@/app/components/Navbar'

interface pageProps {
    params: { jobId: string }
}

const page: FC<pageProps> = ({ params }) => {
    
    console.log(params)
    
    return (
        <div>
            <Navbar />
            <main>
                
            </main>
        </div>
    )
}

export default page