import { Post } from '../../typings'
import classes from './all-posts.module.css'
import PostsGrid from './posts-grid'

type Props = {
  posts: Post[]
}

function AllPosts({ posts }: Props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default AllPosts
