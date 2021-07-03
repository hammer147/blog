import { GetStaticProps } from 'next'
import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'
import { Post } from '../../typings'

type Props = {
  posts: Post[]
}

function AllPostsPage({ posts }: Props) {
  return (
    <AllPosts posts={posts} />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts()
  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostsPage
