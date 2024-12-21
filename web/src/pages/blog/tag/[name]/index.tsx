import LayoutBlog from "@/components/layoutBlog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns'

type Post = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  readTime: string;
  updatedAt: string
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

type Tag = {
  params: {
    name: string
  }
}

type BlogProps = {
  posts: Post[];
  tag: string
  tags: Tag[]
};


export default function Tag({ posts, tag, tags }: BlogProps) {
  if (!posts || posts.length === 0) {
    return <div>{`Nenhum post encontrado para a tag "${tag}"`}</div>;
  }

  return (
    <LayoutBlog>
      <Head>
        {/* <meta charset="utf-8"/> */}
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
        <meta property="og:image" content="/capa-blog.png"/>
        <meta property="og:description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content="Felipe Ferreira Dev | Blog"/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"></meta>
      </Head>
      <main>
        <div className="pt-7 flex justify-center bg-gray-800">
          <Link key={'blog'} href={'/blog'}>
              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Todos os posts
                </button>
              </span>
            </Link>
          {tags.map((tag) => (
            <Link key={tag.params.name} href={`/blog/tag/${tag.params.name}`}>
              <span className="ml-3 hidden sm:block">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {tag.params.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                </button>
              </span>
            </Link>
          ))}
        </div>
        <section className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:max-w-none lg:py-10">
              <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="group relative cursor-pointer">
                      <div className="overflow-hidden rounded-lg bg-white group-hover:opacity-75 ">
                        <img
                          src={post.headerImage?.imageUrl}
                          alt={post.headerImage?.imageUrl}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h2 className="mt-2 text-3xl text-gray-100 font-semibold text-center lg:text-start">
                        {post.title}
                      </h2>
                      <div className="flex items-center justify-center lg:justify-start mt-2 mb-2">
                        <p className="text-gray-100 text-xs tracking-widest mr-3">
                          <time dateTime={post.updatedAt}>📅{format(post.updatedAt, 'd/LL/yyyy')}</time>
                        </p>
                        <p className="text-gray-100 text-xs tracking-widest mr-3">
                          {post.tags.map((tag) => (
                            <span key={tag.id} className="gap-2">
                              📌{tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                            </span>
                          ))}
                        </p>
                        <p className="text-gray-100 text-xs tracking-widest">
                          🕐{post.readTime} min
                        </p>
                      </div>
                      <p className="text-sm text-gray-300 mb-8 mt-2 text-center lg:text-start">{post.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>   
      </main>
    </LayoutBlog>
    //   className="flex min-h-screen flex-col items-center justify-between p-24"
    // >
    //   <div>
    //   <h1 className="text-blue-500 text-lg">
    //     {tag.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    //   </h1>
    //   <Button className="bg-blue-500 " variant={'link'}>
    //     <Link href="/blog">Todos os posts</Link>
    //   </Button>
    //   <div className="grid grid-cols-3 gap-2">
    //     {posts?.map((post) => (
    //       <Link key={post.id} href={`/blog/${post.slug}`}>
    //         <Card>
    //           <CardHeader>
    //             <Image
    //               src={post.headerImage?.imageUrl ?? '/default-image.png'}
    //               width={300}
    //               height={300}
    //               alt="Picture of the author"
    //               className="rounded-xl"
    //             />
    //           </CardHeader>
    //           <CardContent>
    //             <CardTitle>{post.title}</CardTitle>
    //             <CardDescription>{post.summary}</CardDescription>
    //           </CardContent>
    //         </Card>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    // </main>
  )
}

// Função para gerar as páginas estáticas no build
export const getStaticPaths: GetStaticPaths = async () => {
  try {
  // Fetch todas as tags disponíveis
  const response = await api.get('/tag');
  const tags = await response.data.allTags

  // Mapeie as tags que possuem posts vinculados para gerar as rotas estáticas.
  const paths = tags
    .filter((tag: { posts: { published: boolean }[] }) => 
      tag.posts.some(post => post.published)
    )
    .map((tag: { name: string }) => ({
      params: { name: tag.name },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return { paths: [], fallback: false };
  }
}

// Função para buscar os dados dos posts específicos no momento da geração estática
export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params!;
  
  try {
    const response = await api.get(`/posts/tag/${name}`);
    const posts = await response.data.postsByTag

    const responseTags = await api.get('/tag'); // Substitua pela sua API real
    const AllTags = await responseTags.data.allTags

    const tags = AllTags
      .filter((tag: { posts: { published: boolean }[] }) => 
        tag.posts.some(post => post.published)
      )
      .map((tag: { name: string }) => ({
        params: { name: tag.name },
      }));
    
    return {
      props: {
        posts: posts || null,
        tag: name || null,
        tags
      },
    //revalidate: 60, // Revalida a cada 60 segundos
    };
  } catch (error) {
    console.error('Failed to fetch post by slug:', error);
    return {
      props: {
        post: null,
        tag: null,
        tags: null
      },
    };
  }
}
