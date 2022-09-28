import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';

//import styles from '../blog/Blog.module.css'

export default function Post({ post }) {

  return (

    <div className="relative pb-16 overflow-hidden bg-gray-800">
      
        {/*<Image
          className="w-3/4 h-auto mx-auto rounded-xl object-cover"
          src={post.coverImage.url}
          alt="Picture of the author"
          width={100}
          height={75}
        />*/}
      

      <figure>
        <img className="w-3/4 sm:w-1/2 h-auto mx-auto rounded-xl object-cover" src={post.coverImage.url} />
      </figure>
      <div className="relative px-4 pt-5 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-100 sm:text-5xl">
              {post.title}
            </span>
          </h1>
        </div>
        
        
        <div 
          className="mt-8 prose dark:prose-invert prose-img:rounded-xl prose-img:mx-auto mx-auto lg:prose-lg" 
          dangerouslySetInnerHTML={{ __html: post.contentHtml.html }} 
        />
        </div>
        
    </div>
  )
}

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

export async function getStaticProps({ params }) {
  const { post } = await hygraph.request(
    `
    query Post($slug: String!) {
      post(where: { slug: $slug }) {
        title
        contentHtml {
          html
        }
        coverImage {
          url(transformation: {image: {resize: {width: 800, height: 400, fit: crop}}})
        }
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