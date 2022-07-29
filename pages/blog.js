import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/Date'
import Tags from '../components/Tags'

import { getSortedPostsData } from '../lib/posts'

import { DisplaysPosts, DisplaysDescription} from '../styles/blog'

export default function Blog({ allPostsData }) {
  return (
    <>
      <Head>
        <title>Felipe Ferreira</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Component.svg" />
      </Head>

      <main>
        <Tags />

        <div>
          {allPostsData.map((post, index) => (
            <DisplaysPosts key={index}>
              <div>
                <img
                  src={post.thumbnailUrl}
                  alt="thumbnail"
                />
              </div>
              <DisplaysDescription>
                <Link href={'/blog/' + post.slug}>
                  <h2>{post.title}</h2>
                </Link>
                  <div>
                    <Date dateString={post.date} />
                    <Link href={`/blog/tags/${post.tags}`}>
                      <p>📌{post.tags}</p>
                    </Link>
                  </div>
                  <p>{post.description}</p>
              </DisplaysDescription>
            </DisplaysPosts>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
