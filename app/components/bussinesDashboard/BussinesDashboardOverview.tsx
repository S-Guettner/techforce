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
    timestamp:string
    _id:string
}

const BussinesDashboardOverview: FC<BussinesDashboardOverviewProps> = ({}) => {
  
    const { data: session } = useSession()
   
    const [posts, setPost] = useState<Post[]>([])

    const [postId, setPostId] = useState("")
  
    useEffect(() => {
        axios.post('/api/postsOverviewDashboard', {
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
   
   useEffect(() => {
    
   })
   
   
    console.log(posts)
    
    console.log("POST ID LENGTH", postId.length )
    return (
    <main>
        {posts && posts.map((item) => {
            return(
                <BussinesDashboardOverviewPosts 
                    key={nanoid()}
                    setPostId={setPostId}
                    postId={item._id}
                    timeStamp={item.timestamp}
                    jobTitle={item.jobTitle}
                />
            )
        })}
    </main>
  )
}

export default BussinesDashboardOverview