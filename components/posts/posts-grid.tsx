import { Post } from '../../typings'
import PostItem from './post-item'
import classes from './posts-grid.module.css'

type Props = {
  posts: Post[]
}

function PostsGrid({ posts }: Props) {
  return (
    <ul className={classes.grid}>
      {posts.map(post => <PostItem key={post.slug} post={post}/>)}
    </ul>
  )
}

export default PostsGrid
