import { GraphQLClient } from 'graphql-request';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function RelembraAi({ project }) {

  return (
    <>
      <Head>
        <meta charset="utf-8"/>
        <meta name="language" content="pt-BR"/>
        <title>{project.title}</title>
        <meta name="description" content={project.description}/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content={project.title}/>
        <meta property="og:image" content="/capa-blog.png"/>
        <meta property="og:description" content={project.description}></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content={project.title}/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content={project.description}></meta>
      </Head>
      <main className="relative pb-16 overflow-hidden bg-gray-800">
        <header>
          <figure>
            <img className="w-3/4 sm:w-1/2 h-auto mx-auto rounded-xl object-cover" src={project.coverImage.url} alt="print de projeto de uma página de blog" />
          </figure>
        </header>
        <section className="relative px-4 pt-5 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1 className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-100 sm:text-5xl">
              {project.title}
            </h1>
          </div>
          
          <article class="mt-8 prose dark:prose-invert prose-img:rounded-xl prose-img:mx-auto mx-auto lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: project.contentHtml.html }}
          >
          </article>
        </section>
        
      </main>
    </>
  )
}


export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { project } = await hygraph.request(
    `
      {
        project(where: {id: "clmz7j9vo4h2c0blz185jlexc"}) {
            id
            title
            description
            contentHtml {
              html
            }
            coverImage {
              url
            }
          }
      }
    `
  );

  return {
    props: {
      project,
    },
  };
}

