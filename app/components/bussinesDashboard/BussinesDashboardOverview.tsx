"use client"
import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { ObjectId } from 'mongodb';
import BussinesDashboardOverviewPosts from './BussinesDashboardOverviewPosts'
import BussinesDashboardSinglePostEdit from './BussinesDashboardSinglePostEdit'

interface BussinesDashboardOverviewProps {

}

interface Post {
    jobTitle: string
    shortJobDescription: string
    detailedJobDescription: string
    tasks: string[]
    offers: string[]
    requirements: string[]
    contactPerson: string
    _id: string
    timestamp: string
}

const BussinesDashboardOverview: FC<BussinesDashboardOverviewProps> = ({ }) => {

    const { data: session } = useSession()

    const [posts, setPost] = useState<Post[]>([])

    const [postId, setPostId] = useState("")

    const [singlePost, setSinglePost] = useState<Post>()

    useEffect(() => {
        axios.post('/api/postsOverviewDashboard', {
            userEmail: session?.user?.email

        })
            .then(function (response) {
                /*   console.log(response); */
                setPost(response?.data?.jobPosts)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    console.log(singlePost, "post")

    useEffect(() => {
        if (postId.length > 0) {
            axios.post('/api/singlePost', {
                jobId: postId,
                userEmail: session?.user?.email

            })
                .then(function (response) {
                    console.log(response?.data);
                    setSinglePost(response?.data?.jobPosting)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [postId])



    if (postId.length <= 0) {
        return (
            <main>
                {posts && posts.map((item) => {
                    return (
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
    } else {
        return (
            <main>
                <BussinesDashboardSinglePostEdit
                    contactPerson={singlePost?.contactPerson}
                    shortJobDescription={singlePost?.shortJobDescription}
                    detailedJobDescription={singlePost?.detailedJobDescription}
                    jobTitle={singlePost?.jobTitle}
                    offers={singlePost?.offers}
                    requirements={singlePost?.requirements}
                    tasks={singlePost?.tasks}
                />
            </main>
        )
    }

}

export default BussinesDashboardOverview