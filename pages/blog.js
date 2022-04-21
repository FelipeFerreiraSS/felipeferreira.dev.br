import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Blog() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Felipe Ferreira</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Component.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Blog page
        </h1>

        <p className={styles.description}>
          Página inicial do blog
        </p>

        <Link href={"/"}>
          <button>Home</button>        
        </Link>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
          
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        Blog desenvolvido por Felipe Ferreira
      </footer>
    </div>
  )
}
