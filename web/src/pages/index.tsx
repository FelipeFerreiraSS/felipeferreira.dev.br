import About from "@/components/blog/home/about";
import Contact from "@/components/blog/home/contact";
import LatestPosts from "@/components/blog/home/latestPosts";
import Presentation from "@/components/blog/home/presentation";
import Projects from "@/components/blog/home/projects";
import LayoutBlog from "@/components/layoutBlog";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";
import { GetStaticProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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

type BlogProps = {
  posts: Post[];
};

export default function Home({ posts }: BlogProps) {
  return (
    <LayoutBlog>
      <Head>
        {/* <meta charset="utf-8"/> */}
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
        <meta property="og:image" content="/capa-blog.png"/>
        <meta property="og:description" content="Desenvolvedor Front-End com foco em criação de aplicações web."></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content="Felipe Ferreira Dev | Desenvolvimento Front-End"/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content="Desenvolvedor Front-End com foco em criação de aplicações web."></meta>
      </Head>
      <main>
        <Presentation />
        <About />
        <Projects/>
        <LatestPosts latestPosts={posts}/>
        <Contact />
      </main>
    </LayoutBlog>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const responsePosts = await api.get('/posts/published/latest');  
    const posts = responsePosts.data.latestPublishedPosts;
  
    return {
      props: {
        posts
      },
      //revalidate: 60, // Revalida a página a cada 60 segundos
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};
