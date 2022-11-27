import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';

import AllPosts from '../../../components/AllPosts'

export default function NextJs({ posts }) {
  return (
    <>
      <Head>
        <meta charset="utf-8"/>
        <meta name="language" content="pt-BR"/>
        <title>Felipe Ferreira Dev | Blog</title>
        <meta name="description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content="Felipe Ferreira Dev | Blog"/>
        <meta property="og:image" content=""/>
        <meta property="og:description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content="Felipe Ferreira Dev | Blog"/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"></meta>
      </Head>
      <AllPosts allPosts={posts}/>
    </>
  );
}

export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { posts } = await hygraph.request(
    `
      {
        posts(where: {tags_contains_all: "nextJs"}, orderBy: date_DESC) {
          id
          tags
          title
          slug
          coverImage {
            url(transformation: {image: {resize: {width: 800, height: 400, fit: crop}}})
          }
          altImage
          date
          authors {
            name
            picture {
              url(transformation: {image: {resize: {height: 50, width: 50}}})
            }
          }
          description
          readingTime
        }
      }
    `
  );

  return {
    props: {
      posts,
    },
  };
}