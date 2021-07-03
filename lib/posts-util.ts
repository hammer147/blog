import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '../typings'

const postsDirectory = path.join(process.cwd(), 'posts')

function getPostData(fileName: string) {
  const filePath = path.join(postsDirectory, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const {data, content} = matter(fileContent)

  const postSlug = fileName.replace(/\.md$/, '')

  const postData: Post = {
    slug: postSlug,
    ...data as Pick<Post, 'title' | 'date' | 'image' | 'excerpt' | 'isFeatured'>,
    content
  }

  return postData
}

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory)
  const allPosts = postFiles.map(postFile => getPostData(postFile))

  return allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)
}

export function getFeaturedPosts() {
  return getAllPosts().filter(post => post.isFeatured)
}
