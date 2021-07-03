import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '../typings'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostFiles(): string[] {
  return fs.readdirSync(postsDirectory)
}

/**
 * Get post data from a slug
 * @param postIdentifier A slug with or without .md extension
 * @returns A post object
 */
export function getPostData(postIdentifier: string): Post {
  const postSlug = postIdentifier.replace(/\.md$/, '') // remove extension if present
  const filePath = path.join(postsDirectory, `${postSlug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  const postData: Post = {
    slug: postSlug,
    ...data as Pick<Post, 'title' | 'date' | 'image' | 'excerpt' | 'isFeatured'>,
    content
  }

  return postData
}

export function getAllPosts(): Post[] {
  const postFiles = getPostFiles()
  const allPosts = postFiles.map(postFile => getPostData(postFile))
  return allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(post => post.isFeatured)
}
