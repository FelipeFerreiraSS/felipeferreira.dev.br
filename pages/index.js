import Presentation from '../components/home/Presentation';
import About from '../components/home/About';
import Projects from '../components/home/Projects'
import LatestPosts from '../components/home/LatestPosts';
import Contact from '../components/home/Contact';

import Head from 'next/head'

import { GraphQLClient } from 'graphql-request';

export default function Home({ posts }) {

  return (
    <>
      <Head>
        <meta charset="utf-8"/>
        <meta name="language" content="pt-BR"/>
        <title>Felipe Ferreira Dev | Desenvolvimento Front-End</title>
        <meta name="description" content="Desenvolvedor Front-End com foco em criação de aplicações web."/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content="Felipe Ferreira Dev | Desenvolvimento Front-End"/>
        <meta property="og:image" content=""/>
        <meta property="og:description" content="Desenvolvedor Front-End com foco em criação de aplicações web."></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content="Felipe Ferreira Dev | Desenvolvimento Front-End"/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content="Desenvolvedor Front-End com foco em criação de aplicações web."></meta>
      </Head>
      <Presentation />
      <About />
      <Projects/>
      <LatestPosts latestPosts={posts}/>
      <Contact />
    </>
  );
}

export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { posts } = await hygraph.request(
    `
      {
        posts(orderBy: date_DESC) {
          id
          tags
          title
          slug
          readingTime
          tags
          coverImage {
            url(transformation: {image: {resize: {width: 800, height: 400, fit: crop}}})
          }
          date
          authors {
            name
            picture {
              url(transformation: {image: {resize: {height: 50, width: 50}}})
            }
          }
          description
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