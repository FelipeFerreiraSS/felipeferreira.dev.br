import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  headerImage?: {
    imageUrl: string;
  };
};

type BlogProps = {
  posts: Post[];
  tag: string
};


export default function Tag({ posts, tag }: BlogProps) {
  if (!posts || posts.length === 0) {
    return <div>{`Nenhum post encontrado para a tag "${tag}"`}</div>;
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <div>
      <h1 className="text-blue-500 text-lg">
        {tag.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h1>
      <Button className="bg-blue-500 " variant={'link'}>
        <Link href="/blog">Todos os posts</Link>
      </Button>
      <div className="grid grid-cols-3 gap-2">
        {posts?.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card>
              <CardHeader>
                <Image
                  src={post.headerImage?.imageUrl ?? '/default-image.png'}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                  className="rounded-xl"
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.summary}</CardDescription>
              </CardContent>
              {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </Card>
          </Link>
        ))}
      </div>
    </div>
    </main>
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
    
    return {
      props: {
        posts: posts || null,
        tag: name || null
      },
    //revalidate: 60, // Revalida a cada 60 segundos
    };
  } catch (error) {
    console.error('Failed to fetch post by slug:', error);
    return {
      props: {
        post: null,
        tag: null
      },
    };
  }
}
