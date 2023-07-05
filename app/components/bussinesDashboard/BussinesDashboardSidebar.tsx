import { FC } from 'react'

interface BussinesDashboardSidebarProps {
    setSelectedAction:React.Dispatch <React.SetStateAction<string>>
}

const BussinesDashboardSidebar: FC<BussinesDashboardSidebarProps> = ({ setSelectedAction }) => {
    return (
        <div className='p-2'>
            
            <button onClick={() => setSelectedAction("overview")} className='border-2 border-black rounded-md text-black block' >Overview</button>
            <button onClick={() => setSelectedAction("new-post")} className='border-2 border-black rounded-md text-black block' >Create new Job Post</button>
        </div>

    )
}

export default BussinesDashboardSidebar