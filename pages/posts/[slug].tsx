import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '../../lib/posts-util'
import { Post } from '../../typings'

type Props = {
  post: Post
}

function PostDetailPage({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params!

  const postData = getPostData(slug as string)

  return {
    props: {
      post: postData
    },
    revalidate: 600
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postFilenames = getPostsFiles()
  const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''))
  const paths = slugs.map(slug => ({ params: { slug } }))
  
  return {
    paths,
    fallback: false
  }
}

export default PostDetailPage
