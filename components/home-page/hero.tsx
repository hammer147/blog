import Image from 'next/image'
import classes from './hero.module.css'

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/Ben.png" alt="Picture of the author" width={300} height={300}/>
      </div>
      <h1>Hi, I&apos;m Ben</h1>
      <p>I blog about web development. Especially about React and Next.js.</p>
    </section>
  )
}

export default Hero
