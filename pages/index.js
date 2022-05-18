import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import emailjs from 'emailjs-com'

import Date from '../components/Date'
import { getSortedPostsData } from '../lib/posts'

import { 
  Main, 
  Cover, 
  Description, 
  Button, 
  Img, 
  About, 
  AboutMe, 
  SocialIcons, 
  Knowledge, 
  Technology, 
  TechnologyGrid, 
  Projects, 
  AllProjects,
  Posts,
  LatestPosts,
  DisplayingPosts,
  Tags,
  DescriptionPost,
  AllPosts,
  AllTagsGrid
} from '../styles/home'

export default function Home({latestPosts}) {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_evzb4es', 'template_f86utpv', e.target, 'zzy0NGXS0nnf-dlsP')

    .then((result) => {
        alert("Mensagem enviada com sucesso! 👍");
      
    }, (error) => {
        alert(error.message)
        
    });
    e.target.reset()
  }

  return (
    <>
      <Head>
        <title>Felipe Ferreira</title>
        <meta name="description" content="Desenvolvedor Front-End Jr" />
        <link rel="icon" href="/Component.svg" />
      </Head>

      <Main>
        <Cover>
          <Description>
            <div>
              <h3>Olá, eu sou</h3>
              <h1>Felipe Ferreira</h1>
              <h3>Desenvolvedor Front-End</h3>
            </div>
            <Button>
              <a href='https://www.linkedin.com/in/felipeferreiradev/' target="_blank">
                <button>Linkedin</button>
              </a>
              <a href='https://github.com/FelipeFerreiraSS' target="_blank">
                <button>GitHub</button>
              </a>
            </Button>
          </Description>
          <Img>
            <Image 
              src={"/img_developer.svg"} 
              alt={"img developer"}
              width={"500px"}
              height={"500px"}
            />
          </Img>
        </Cover>

        <About>
          <AboutMe>
            <h2>Sobre mim</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <SocialIcons>
              <ul>
                <li>
                  <a href='https://github.com/FelipeFerreiraSS' target="_blank">
                    <img src='/socialIcons/github-icon.svg'/>
                  </a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/in/felipeferreiradev/' target="_blank">
                    <img src='/socialIcons/linkedin-icon.svg'/>
                  </a>
                </li>
                <li>
                  <a href='mailto:felipeferreirasilva.dev@gmail.com' target="_blank">
                    <img src='/socialIcons/email-icon.svg'/>
                  </a>
                </li>
                <li>
                  <a href='https://codepen.io/FelipeFerreira_ss' target="_blank">
                    <img src='/socialIcons/codepen-icon.svg'/>
                  </a>
                </li>
              </ul>
            </SocialIcons>
            <Button>
              <a href=''>
                <button>Currículo</button>
              </a>
              <a href=''>
                <button>Contato</button>
              </a>
            </Button>
          </AboutMe>
          <Knowledge>
            <h2>Conhecimentos</h2>
            <Technology>
              <TechnologyGrid>
                <div>
                  <img src='/techIcons/reactjs_icon.svg'/>
                  <p>React JS</p>
                </div>
                <div>
                  <img src='/techIcons/nextjs_icon.svg'/>
                  <p>Next JS</p>
                </div>
                <div>
                  <img src='/techIcons/git_icon.svg'/>
                  <p>Git</p>
                </div>
              </TechnologyGrid>
              <TechnologyGrid>
                <div>
                  <img src='/techIcons/html5_icon.svg'/>
                  <p>HTML 5</p>
                </div>
                <div>
                  <img src='/techIcons/css3_icon.svg'/>
                  <p>CSS 3</p>
                </div>
                <div>
                  <img src='/techIcons/javascript_icon.svg'/>
                  <p>Java Script</p>
                </div>
              </TechnologyGrid>
              <TechnologyGrid>
                <div>
                  <img src='/techIcons/figma_icon.svg'/>
                  <p>Figma</p>
                </div>
                <div>
                  <img src='/techIcons/styled_icon.svg'/>
                  <p>Styled Components</p>
                </div>
                <div>
                  
                </div>
              </TechnologyGrid>
            </Technology>
          </Knowledge>
        </About>

        <Projects>
          <h2>Projetos</h2>
          <AllProjects>
            <div>
              <img src='/mysite.png'/>
              <h3>Meu blog/site</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
              </p>
              <Button>
                <a href=''>
                  <button>Veja o projeto</button>
                </a>
              </Button>
            </div>
            <div>
              <img src='/programming.svg'/>
              <h3>Em desenvolvimento</h3>
              <p>Em desenvolvimento, entre no github
                para ver outros projetos
              </p>
              <Button>
                <a href=''>
                  <button>GitHub</button>
                </a>
              </Button>
            </div>
          </AllProjects>
        </Projects>

        <Posts>
          <h2>
            Últimos posts no blog
          </h2>
          <LatestPosts>
            <DisplayingPosts>
              {latestPosts.map((post, index) => (
                <div key={index}>
                  <div>
                    <img src={post.thumbnailUrl}/>
                  </div>
                  <DescriptionPost>
                    <Link href={'/blog/' + post.slug} passHref key={index}>
                      <h3>{post.title}</h3>
                    </Link>
                    <div>
                      <Date dateString={post.date} /> 
                      <p>10 min</p>
                    </div>
                    <p>{post.description}</p>
                  </DescriptionPost>
                </div>
              ))}
              <AllPosts>
                <Button>
                  <Link href={'/blog'} passHref>
                    <button>Todos os posts</button>
                  </Link>
                </Button>
              </AllPosts>
            </DisplayingPosts>

            <Tags>
              <h2>Tags</h2>
              <div>
                <AllTagsGrid>
                  <div>
                    <Link href={'/tags/react'} passHref>
                      <p>#React</p>
                    </Link>
                  </div>
                  <div>
                    <p>#JS</p>
                  </div>
                </AllTagsGrid>
                <AllTagsGrid>
                  <div>
                    <p>#NextJs</p>
                  </div>
                  <div>
                    <p>#HTML</p>
                  </div>
                </AllTagsGrid>
                <AllTagsGrid>
                  <div>
                    <p>#CSS</p>
                  </div>
                  <div>
                    <p>#MDX</p>
                  </div>
                </AllTagsGrid>
              </div>
            </Tags>
          </LatestPosts>
        </Posts>

        <section>
          <h2>
            Contato
          </h2>

          {/*
          <div id="contato">
            <div>
              <h2>Contato</h2>
              <form onSubmit={sendEmail}>
                <div>
                  <div>
                    <label>Nome</label>
                    <input type="text" autoFocus required placeholder="Nome" name="name"/>
                  </div>
                  <div>
                  <label>Email</label>
                    <input type="email" required placeholder="Seu email" name="email"/>
                  </div>
                  <div>
                  <label>Mensagem</label>
                    <textarea id="" cols="30" rows="8" required placeholder="Sua mensagem" name="message"></textarea>
                  </div>
                  <div>
                    <input type="submit" value="Enviar mensagem"></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
          */}
        </section>

      </Main>

      <footer>
        Blog desenvolvido por Felipe Ferreira
      </footer>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  var latestPosts = []
  for (var i = 0; i < 3; i++) {
    latestPosts.push(allPostsData[i])
  }

  return {
    props: {
      latestPosts
    }
  }
}
