"use client"
import { FC,useEffect,useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import BussinesDashboardOverviewPosts from './BussinesDashboardOverviewPosts'

interface BussinesDashboardOverviewProps {
  
}

interface Post {
    jobTitle: string;
    
}

const BussinesDashboardOverview: FC<BussinesDashboardOverviewProps> = ({}) => {
  
    const { data: session } = useSession()
   
    const [posts, setPost] = useState<Post[]>([])
  
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
/*     console.log(posts[0]) */
    return (
    <main>
        {posts && posts.map((item) => {
            return(
                <BussinesDashboardOverviewPosts 
                    key={nanoid()}
                    jobTitle={item.jobTitle}
                />
            )
        })}
    </main>
  )
}

export default BussinesDashboardOverview