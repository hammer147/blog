import Head from 'next/head'
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { Post } from '../typings'
import { getFeaturedPosts } from '../lib/posts-util'
import { GetStaticProps } from 'next'

type Props = {
  posts: Post[]
}

function HomePage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Ben&apos;s Blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = getFeaturedPosts()
  return {
    props: {
      posts: featuredPosts
    }
  }
}

export default HomePage
