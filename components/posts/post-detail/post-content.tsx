import ReactMarkdown from 'react-markdown'
import { Post } from '../../../typings'
import classes from './post-content.module.css'
import PostHeader from './post-header'
import Image from 'next/image'

type Props = {
  post: Post
}

function PostContent({ post }: Props) {

  const imagePath = `/images/posts/${post.slug}/${post.image}`

  // We want to use the Image component from Next.js
  // img elements are wrapped in a p by react-markdown
  // Just replacing img with Image would cause a warning about a div in a p
  // therefor we replace each p that wraps an img with a div that wraps an Image
  // We are not using typings here because it is quite complex:
  // https://stackoverflow.com/questions/66628783/react-markdown-type-for-paragraph-renderer

  const customRenderers = {
    p(paragraph: any) {
      const { node, children } = paragraph
      if (node.children[0].tagName === 'img') {
        const image = node.children[0]
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        )
      }
      return <p>{children}</p>
    }
  }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  )
}

export default PostContent
