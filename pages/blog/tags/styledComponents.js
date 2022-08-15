import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Date from '../../../components/Date'
import HeadTag from '../../../components/HeadTag'
import Tags from '../../../components/Tags'

import { getSortedPostsData } from '../../../lib/posts'

import { DisplaysPosts, DisplaysDescription} from '../../../styles/blog'

export default function tagsStyledComponents({ tags }) {
  return (
    <div>
      <HeadTag
        title={"Felipe Ferreira | Dev Front-End"}
        description={"Desenvolvedor Front-End Jr"}
      />

      <main>
        <Tags/>

        <div>
          {tags.map((post, index) => (
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
                    <p>📌{post.tags}</p>
                  </div>
                  <p>{post.description}</p>
              </DisplaysDescription>
            </DisplaysPosts>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  const tags = allPostsData.filter(i => i.tags === 'styledComponents')
  return {
    props: {
      tags
    }
  }
}
