import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';

export default function MeuBlog({ project }) {

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
        <img className="w-3/4 sm:w-1/2 h-auto mx-auto rounded-xl object-cover" src="/projectsImg.svg" />
      </figure>
      <div className="relative px-4 pt-5 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-100 sm:text-5xl">
              {project.title}
            </span>
          </h1>
        </div>
        
        <article class="mt-8 prose dark:prose-invert prose-img:rounded-xl prose-img:mx-auto mx-auto lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: project.contentHtml.html }}
        >
        </article>
      </div>
        
    </div>
  )
}


export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { project } = await hygraph.request(
    `
      {
        project(where: {id: "cl9ywoby8216r0blqb3sykqw6"}) {
            id
            title
            description
            contentHtml {
              html
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