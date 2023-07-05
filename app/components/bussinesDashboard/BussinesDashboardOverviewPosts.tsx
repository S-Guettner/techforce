import { FC } from 'react'

interface BussinesDashboardOverviewPostsProps {
    jobTitle:string
}

const BussinesDashboardOverviewPosts: FC<BussinesDashboardOverviewPostsProps> = ({ jobTitle }) => {
  return (
    <main>
          <p>{jobTitle}</p>
    </main>
  )
}

export default BussinesDashboardOverviewPosts