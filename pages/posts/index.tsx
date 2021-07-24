import Head from 'next/head'
import { GetStaticProps } from 'next'
import AllPosts from '../../components/posts/all-posts'
import { getAllPosts } from '../../lib/posts-util'
import { Post } from '../../typings'

type Props = {
  posts: Post[]
}

function AllPostsPage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta 
          name="description"
          content="A list of all programming posts"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
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
