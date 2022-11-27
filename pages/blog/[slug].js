import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Date from '../../components/Date';

export default function Post({ post }) {
  return (
    <>
      <Head>
        <meta charset="utf-8"/>
        <meta name="language" content="pt-BR"/>
        <title>{post.title}</title>
        <meta name="description" content={post.description}/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content={post.title}/>
        <meta property="og:image" content={post.coverImage.url}/>
        <meta property="og:description" content={post.description}></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content={post.title}/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content={post.description}></meta>
      </Head>
      <main className="relative pb-16 overflow-hidden bg-gray-800">
        <header>
          <figure>
            <img className="w-3/4 sm:w-1/2 h-auto mx-auto rounded-xl object-cover" src={post.coverImage.url} alt={post.altImage} />
          </figure>
        </header>
        <section className="relative px-4 pt-5 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1 className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-100 sm:text-5xl">
              {post.title}
            </h1>
            <div class="flex items-center justify-center mt-5">
              <span class="text-gray-100 text-base tracking-widest mr-3">
                <Date dateString={post.date}/>
              </span>
              <Link href={`/blog/tags/${post.tags}`}>
                <span class="cursor-pointer text-gray-100 text-base tracking-widest mr-3">
                  📌{post.tags}
                </span>
              </Link>
              <p class="text-gray-100 text-base tracking-widest">
                🕐{post.readingTime}
              </p>
            </div>
          </div>
          
          <article 
            className="mt-8 prose dark:prose-invert prose-img:rounded-xl prose-img:mx-auto mx-auto lg:prose-lg" 
            dangerouslySetInnerHTML={{ __html: post.contentHtml.html }} 
          />
        </section>
      </main>
    </>
  )
}

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

export async function getStaticProps({ params }) {
  const { post } = await hygraph.request(
    `
    query Post($slug: String!) {
      post(where: { slug: $slug }) {
        title
        readingTime
        tags
        date
        contentHtml {
          html
        }
        coverImage {
          url(transformation: {image: {resize: {width: 800, height: 400, fit: crop}}})
        }
        altImage
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await hygraph.request(`
    {
      posts {
        slug
      }
    }
  `);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}