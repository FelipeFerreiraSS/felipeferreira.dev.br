import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'

import YouTube from '../../components/YouTube'
import Date from '../../components/Date'
import TextStyle from '../../components/TextStyle'

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts',
    slug + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

const PostPage = ({ frontMatter, mdxSource }) => {
  return (
    <div className={styles.container}>
      <div>
        <Link href="/">
          <button>
            Home
          </button>
        </Link>
      </div>
      <img src={frontMatter.thumbnailUrl} alt="thumbnail" className={styles.thumbnail}></img>
      {/* <Image
        src={frontMatter.thumbnailUrl}
        alt="thumbnail"
        width={800}
        height={400}
      /> */}
      <h1>{frontMatter.title}</h1>
      <Date dateString={frontMatter.date} />
      <div>
        {frontMatter.tags.map((item) => (
            <span key={item}>{item}</span>
        ))}
      </div>
      <main className={styles.mainPost}>
        <MDXRemote {...mdxSource} components={{ YouTube, TextStyle}}/>
      </main>
    </div>
  )
}

export default PostPage