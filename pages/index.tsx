import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'

function HomePage() {

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
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  )
}

export default HomePage
