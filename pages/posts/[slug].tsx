import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '../../lib/posts-util'
import { Post } from '../../typings'

type Props = {
  post: Post
}

function PostDetailPage({ post }: Props) {
  return <PostContent post={post} />
}

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context
  const { slug } = params!

  const postData = getPostData(slug as string)

  return {
    props: {
      post: postData
    },
    revalidate: 600
  }
}

export const getStaticPaths: GetStaticPaths = async context => {
  const postFilenames = getPostsFiles()
  const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''))
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  }
}

export default PostDetailPage
