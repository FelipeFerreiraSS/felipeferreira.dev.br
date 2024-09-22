import Image from "next/image";
import { Post as PostType } from "@/types/Post";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "@/services/api";

type PostProps = {
  post: PostType | null;
};


export default function Post({ post }: PostProps) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return(
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-lg mb-5">
        <Button className="bg-blue-500 " variant={'link'}>
          <Link href="/blog">Blog</Link>
        </Button>
        <Image
          src={post?.headerImage?.imageUrl ?? '/default-image.png'}
          width={700}
          height={300}
          alt="Picture of the post header"
          className="rounded-xl"
        />
        <div className="text-6xl font-bold mt-4">{post?.title}</div>
        <div className="text-lg text-gray-500 mt-2">Autor: {post?.author.firstName} {post?.author.lastName}</div>
        
        <ul className="flex flex-wrap gap-2 mt-4">
          {post?.tags.map((tag) => (
            <Link key={tag.id} href={`/blog/tag/${tag.name}`}>
              <li className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
              </li>
            </Link>
          ))}
        </ul>
        
        <div
          className="prose prose-img:rounded-xl prose-lg prose-blue mt-6"
          dangerouslySetInnerHTML={{ __html: post?.content ?? '' }}
        ></div>
      </div>
    </div>
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