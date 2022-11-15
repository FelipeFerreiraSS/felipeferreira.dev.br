import { GraphQLClient } from 'graphql-request';

import AllPosts from '../../../components/AllPosts'

export default function StyledComponents({ posts }) {
  return (
    <AllPosts allPosts={posts}/>
  );
}

export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { posts } = await hygraph.request(
    `
      {
        posts(where: {tags_contains_all: "styledComponents"}, orderBy: date_DESC) {
          id
          tags
          title
          slug
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
          readingTime
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