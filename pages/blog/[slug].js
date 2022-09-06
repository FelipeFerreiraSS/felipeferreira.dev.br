import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'

import { MainPost, PostData, Post, Thumbnail } from './styles.js'

import Youtube from '../../components/Youtube'
import Date from '../../components/Date'
import TextStyle from '../../components/TextStyle'
import Code from '../../components/Code'
import ImagePost from '../../components/ImagePost'
import QuoteCode from '../../components/QuoteCode'
import LinkExternal from '../../components/LinkExternal'
import HeadTag from '../../components/HeadTag/index.js'

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
    <MainPost>
      <HeadTag
        title={frontMatter.title}
        description={frontMatter.description}
      />

      <div>
        <Thumbnail>
          <picture>
            <img src={frontMatter.thumbnailUrl} alt="thumbnail"/>
          </picture>
        </Thumbnail>
        <h1>{frontMatter.title}</h1>
        <PostData>
          <Date dateString={frontMatter.date} />
          
          <Link href={`/blog/tags/${frontMatter.tags}`}>
            <span>📌{frontMatter.tags}</span>
          </Link>
        </PostData>
        <Post>
          <MDXRemote {...mdxSource} components={{ Youtube, TextStyle, Code, ImagePost, QuoteCode, LinkExternal}}/>
        </Post>
      </div>
    </MainPost>
  )
}

export default PostPage