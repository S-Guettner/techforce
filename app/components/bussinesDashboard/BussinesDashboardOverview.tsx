"use client"
import { FC,useEffect,useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

interface BussinesDashboardOverviewProps {
  
}

const BussinesDashboardOverview: FC<BussinesDashboardOverviewProps> = ({}) => {
  
    const { data: session } = useSession()
   
    const [posts,setPost] = useState({})
  
    useEffect(() => {
        axios.post('/api/postsOverview', {
            userEmail: session?.user?.email

        })
            .then(function (response) {
                console.log(response);
                setPost(response?.data?.jobPosts)
            })
            .catch(function (error) {
                console.log(error);
            });
    },[])
    console.log(posts)
    return (
    <main>

    </main>
  )
}

export default BussinesDashboardOverview