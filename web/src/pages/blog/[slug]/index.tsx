import Image from "next/image";
import { Post as PostType } from "@/types/Post";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import Head from "next/head";
import LayoutBlog from "@/components/layoutBlog";
import { format } from 'date-fns'

type Post = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  readTime: string;
  updatedAt: string
  content: string;
  headerImage?: {
    imageUrl: string;
  };
  tags: [
    {
      id: number;
      name: string
    }
  ]
};

type PostProps = {
  post: Post;
};

type Heading = {
  id: string;
  title: string;
};

function extractHeadingsFromContent(content: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const headingElements = doc.querySelectorAll("h2, h3, h4, h5");
  
  return Array.from(headingElements).map((heading) => {
    const text = heading.textContent || "";
    const id = text.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    heading.setAttribute("id", id);
    return { id, title: text };
  });
}

export default function Post({ post }: PostProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (post?.content) {
      const extractedHeadings = extractHeadingsFromContent(post.content);
      setHeadings(extractedHeadings);
    }
  }, [post?.content]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return(
    <LayoutBlog>
      <Head>
        {/* <meta charset="utf-8"/> */}
        <meta name="language" content="pt-BR"/>
        <title>{post.title}</title>
        <meta name="description" content={post.summary}/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content={post.title}/>
        <meta property="og:image" content={post.headerImage?.imageUrl}/>
        <meta property="og:description" content={post.summary}></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content={post.title}/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content={post.summary}></meta>
      </Head>
      <main className="relative pb-16 overflow-hidden bg-gray-800">
        <header>
          <figure>
            {post.headerImage?.imageUrl ? (
              <Image
                src={post.headerImage?.imageUrl}
                width={700}
                height={700}
                alt="Picture of the author"
                className="w-3/4 sm:w-sm md:w-md max-w-xl max-h-full mx-auto object-cover rounded-xl mb-3"
              />
            ):null}
          </figure>
        </header>
        <section className="relative px-4 pt-5 sm:px-6 lg:px-8 max-w-2xl m-auto">
          <div className="text-lg max-w-prose mx-auto">
            <h1 className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-100 sm:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center mt-5">
              <span className="text-gray-100 text-base tracking-widest mr-3">
                <time >📅{format(post.updatedAt, 'd/LL/yyyy')}</time>
              </span>
              {post.tags.map((tag) => (
                <Link href={`/blog/tags/${post.tags}`}>
                  <span className="cursor-pointer text-gray-100 text-base tracking-widest mr-3">
                    📌{tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                  </span>
                </Link>
              ))}
              <p className="text-gray-100 text-base tracking-widest">
                🕐{post.readTime} min
              </p>
            </div>
          </div>
          <section
            className="mt-8 prose text-white dark:prose-invert prose-img:rounded-xl prose-img:mx-auto mx-auto lg:prose-lg" 
            dangerouslySetInnerHTML={{ __html: post.summary }} 
          />
          <div className="bg-gray-700 p-3 rounded-lg mt-5">
            {headings.length > 0 && (
              <div className="prose">
                <h2 className="text-3xl font-bold mb-4 text-gray-100">Conteúdo</h2>
                <ul className="list-none">
                  {headings.map((heading) => (
                    <li key={heading.id} className="mb-2">
                      <a href={`#${heading.id}`} className="text-blue-500 no-underline hover:underline">
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <article 
            className="mt-8 prose text-white dark:prose-invert prose-img:rounded-xl prose-img:mx-auto mx-auto lg:prose-lg" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </section>
      </main>
    </LayoutBlog>
    // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    //   <div className="mx-auto w-full max-w-lg mb-5">
    //     <Button className="bg-blue-500 " variant={'link'}>
    //       <Link href="/blog">Blog</Link>
    //     </Button>
    //     <Image
    //       src={post?.headerImage?.imageUrl ?? '/default-image.png'}
    //       width={700}
    //       height={300}
    //       alt="Picture of the post header"
    //       className="rounded-xl"
    //     />
    //     <div className="text-6xl font-bold mt-4">{post?.title}</div>
    //     <div className="text-lg text-gray-500 mt-2">Autor: {post?.author.firstName} {post?.author.lastName}</div>
        
    //     <ul className="flex flex-wrap gap-2 mt-4">
    //       {post?.tags.map((tag) => (
    //         <Link key={tag.id} href={`/blog/tag/${tag.name}`}>
    //           <li className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
    //           {tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
    //           </li>
    //         </Link>
    //       ))}
    //     </ul>

    //     {headings.length > 0 && (
    //       <div className="my-6 p-4 border border-gray-300 rounded-lg">
    //         <h3 className="text-xl font-bold mb-4">Sumário</h3>
    //         <ul>
    //           {headings.map((heading) => (
    //             <li key={heading.id} className="mb-2">
    //               <a href={`#${heading.id}`} className="text-blue-500 hover:underline">
    //                 {heading.title}
    //               </a>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     )}
        
    //     <div
    //       className="prose prose-img:rounded-xl prose-lg prose-blue mt-6"
    //       dangerouslySetInnerHTML={{ __html: post?.content ?? '' }}
    //     ></div>
    //   </div>
    // </div>
  )
}

// Função para gerar as páginas estáticas no build
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Busque todos os slugs dos posts publicados
    const response = await api.get('/posts/published');
    const posts = response.data.publishedPosts;

    // Mapeie os slugs para gerar as rotas estáticas
    const paths = posts.map((post: PostType) => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Failed to fetch posts slugs:', error);
    return { paths: [], fallback: false };
  }
};

// Função para buscar os dados de um post específico no momento da geração estática
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!; // Pegando o slug da rota dinâmica

  try {
    const response = await api.get(`/posts/slug/${slug}`);

    const post = response.data.post[0];

    return {
      props: {
        post: post || null,
      },
      //revalidate: 60, // Revalida a cada 60 segundos
    };
  } catch (error) {
    console.error('Failed to fetch post by slug:', error);
    return {
      props: {
        post: null,
      },
    };
  }
};