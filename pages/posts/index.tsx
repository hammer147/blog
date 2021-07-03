import AllPosts from '../../components/posts/all-posts'

function AllPostsPage() {

  const DUMMY_POSTS = [
    {
      slug: 'getting-started',
      title: 'Getting Started',
      image: 'getting-started-nextjs.png',
      excerpt: 'NextJS is a React framework for production',
      date: '2022-02-15'
    },
    {
      slug: 'getting-started2',
      title: 'Getting Started',
      image: 'getting-started-nextjs.png',
      excerpt: 'NextJS is a React framework for production',
      date: '2022-02-15'
    },
    {
      slug: 'getting-started3',
      title: 'Getting Started',
      image: 'getting-started-nextjs.png',
      excerpt: 'NextJS is a React framework for production',
      date: '2022-02-15'
    },
    {
      slug: 'getting-started4',
      title: 'Getting Started',
      image: 'getting-started-nextjs.png',
      excerpt: 'NextJS is a React framework for production',
      date: '2022-02-15'
    }
  ]

  return (
    <AllPosts posts={DUMMY_POSTS} />
  )
}

export default AllPostsPage
