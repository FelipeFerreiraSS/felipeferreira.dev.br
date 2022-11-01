import Presentation from '../components/home/Presentation';
import About from '../components/home/About';
import Projects from '../components/home/Projects'
import LatestPosts from '../components/home/LatestPosts';
import Contact from '../components/home/Contact';

import { GraphQLClient } from 'graphql-request';

export default function Home({ posts }) {

  return (
    <>
      <Presentation />
      <About />
      <Projects/>
      <LatestPosts teste={posts}/>
      <Contact />
    </>
  );
}

export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { posts } = await hygraph.request(
    `
      {
        posts(orderBy: date_DESC) {
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