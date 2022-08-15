import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import emailjs from 'emailjs-com'

import Date from '../components/Date'
import { getSortedPostsData } from '../lib/posts'

import { MdEmail } from 'react-icons/Md';
import { BsGithub, BsLinkedin } from 'react-icons/Bs';
import { AiFillCodepenSquare } from 'react-icons/Ai';

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
  AllTagsGrid,
  Contact,
  BoxMenssages,
  Menssages,
} from '../styles/home'
import HeadTag from '../components/HeadTag'

export default function Home({latestPosts}) {

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLETE_ID, e.target, process.env.NEXT_PUBLIC_USER_ID)

    .then((result) => {
        alert("Mensagem enviada com sucesso!👍 Responderei o mais breve possível.");
      
    }, (error) => {
        alert(error.message)
        
    });
    e.target.reset()
  }

  return (
    <>
      <HeadTag
        title={"Felipe Ferreira | Dev Front-End"}
        description={"Desenvolvedor Front-End Jr"}
      />

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

        <About id="about">
          <AboutMe>
            <h2>Sobre mim</h2>
            <p>
              Olá, eu sou Felipe Ferreira, desenvolvedor Front-End com 
              foco em criação de aplicações web.
            </p>
            <p>
            Tenho conhecimentos nas principais tecnologias do mercado no 
            quesito desenvolvimento de software e design de interfaces.
            </p>
            
            <SocialIcons>
              <ul>
                <li>
                  <a href='https://github.com/FelipeFerreiraSS' target="_blank">
                    <BsGithub size={40}/>
                  </a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/in/felipeferreiradev/' target="_blank">
                    <BsLinkedin size={40}/>
                  </a>
                </li>
                <li>
                  <a href='mailto:felipeferreirasilva.dev@gmail.com' target="_blank">
                    <MdEmail size={55}/>
                  </a>
                </li>
                <li>
                  <a href='https://codepen.io/FelipeFerreira_ss' target="_blank">
                    <AiFillCodepenSquare size={50}/>
                  </a>
                </li>
              </ul>
            </SocialIcons>
            <Button>
              <a href=''>
                <button>Currículo</button>
              </a>
              <Link href='/#contact'>
                <button>Contato</button>
              </Link>
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

        <Projects id="projects">
          <h2>Projetos</h2>
          <AllProjects>
            <div>
              <img src='/projectsImg.svg'/>
              <h3>Meu blog/site</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
              </p>
              <Button>
                <a href='/projects/site-blog'>
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
                <a href='https://github.com/FelipeFerreiraSS' target="_blank">
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
                      <span>📌{post.tags}</span>
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
                    <Link href={'/blog/tags/css'} passHref>
                      <p>CSS</p>
                    </Link>
                  </div>
                  <div>
                    <Link href={'/blog/tags/nextJs'} passHref>
                      <p>Next JS</p>
                    </Link>
                  </div>
                </AllTagsGrid>
                <AllTagsGrid>
                  <div>
                    <Link href={'/blog/tags/styledComponents'} passHref>
                      <p>Styled Components</p>
                    </Link>
                  </div>
                  { /*<div>
                    <p>#HTML</p>
                  </div>*/}
                </AllTagsGrid>
                { /*<AllTagsGrid>
                  <div> 
                    <p>#CSS</p>
                  </div>
                  <div>
                    <p>#MDX</p>
                  </div>
                </AllTagsGrid> */ }
              </div>
            </Tags>
          </LatestPosts>
        </Posts>

        <Contact id="contact">
          <div>
            <h2>Vamos trabalhar juntos?</h2>
            <p>Envie sua mensagem que responderei o mais breve possível.</p>
          </div>

          <BoxMenssages>
            <div>
              <img src='/messages.svg'/>
            </div>
          
            <Menssages>
              <form onSubmit={sendEmail}>
                <div>
                  <div>
                    {/*<label>Nome</label>*/}
                    <input type="text" required placeholder="Nome" name="name"/>
                  </div>
                  <div>
                    <input type="email" required placeholder="Seu email" name="email"/>
                  </div>
                  <div>
                    <textarea id="" cols="30" rows="8" required placeholder="Digite sua mensagem" name="message"></textarea>
                  </div>
                  <div>
                    <button type="submit" value="Enviar mensagem">Enviar mensagem</button>
                  </div>
                </div>
              </form>
            </Menssages>
          </BoxMenssages>
        </Contact>

      </Main>
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
