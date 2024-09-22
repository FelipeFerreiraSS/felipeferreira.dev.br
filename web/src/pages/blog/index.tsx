import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { GetStaticProps } from "next";
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

type Tag = {
  params: {
    name: string
  }
}

type BlogProps = {
  posts: Post[];
  tags: Tag[]
};

export default function Blog({ posts, tags }: BlogProps) {
  return (  
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <div>
      <h1 className="text-blue-500">Blog</h1>
      <Button className="bg-blue-500 " variant={'link'}>
        <Link href="/">Home</Link>
      </Button>
      <div className="m-5">
        <h2>Tags</h2>
        {tags.map((tag) => (
          <Button key={tag.params.name} className="bg-blue-500 mr-5" variant={'link'}>
            <Link href={`/blog/tag/${tag.params.name}`}>{tag.params.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}</Link>
          </Button>
        ))}
      </div>
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
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const responsePosts = await api.get('/posts/published');
    const posts = responsePosts.data.publishedPosts;

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
        posts,
        tags,
      },
      //revalidate: 60, // Revalida a página a cada 60 segundos
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      props: {
        posts: [],
        tags: []
      },
    };
  }
};