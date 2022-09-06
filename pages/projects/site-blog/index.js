import { MainPost, PostData, Post, Thumbnail, Technologies } from '../../blog/styles'

import LinkExternal from '../../../components/LinkExternal'
import HeadTag from '../../../components/HeadTag'

import { GrReactjs } from 'react-icons/Gr';
import { SiNextdotjs, SiStyledcomponents, SiHtml5, SiCss3, SiJavascript, SiMarkdown, SiGit, SiVercel } from 'react-icons/Si';

const SiteBlog = () => {
  return (
    <MainPost>
      <HeadTag 
        title={"Felipe Ferreira | Dev Front-End"}
        description={"Projeto site/blog"}
      />
      <div>
        <Thumbnail>
          <picture>
            <img src="/projectsImg.svg" alt="thumbnail"/>
          </picture>
        </Thumbnail>
        <h1>Meu site/blog</h1>
        <PostData>
        </PostData>
        <Post>
          <h2>Sobre o projeto</h2>
          <p>
            Desenvolvi este projeto como o intuito de criar um blog para meu site, para que eu possa escrever posts e compartilhar meus estudos. Os posts são escritos em Markdown que facilita muito a criação do conteúdo. <br/>
          </p>
          <p>
            A ideia principal do projeto é ter um blog que eu possa customizar da maneira que quiser e adicionando melhorias conforme vou aprendendo novas tecnologias.<br/>
          </p>

          <p>
            A principal tecnologia em que o blog é desenvolvido é NextJS, pois ele traz um dos principais requisito para um blog, o SEO. Como eu quero ser encontrado pelos mecanismos de buscar, desenvolver o projeto com SEO era muito importante, por isso escolhi o NextJS.
          </p>
          <p>
            Para estilizar eu escolhi o styled-components por ser mais fácil de se dar manutenção e a possibilidade de se criar componentes deixando o desenvolvimento mais rápido.
          </p>
          <p>
            Para escrever os artigos utilizei Markdwon que é uma linguagem simples de marcação que torna a escrita dos posts muito mais rápida e fácil.
          </p>
          <p>
            No versionamento de código, utilizei o git com github e o gerenciador de pacotes Yarn para instalar dependências e outros pacotes do projeto.
          </p>
          <p>
            Para hospedar o site utilizei a plataforma da Vercel que é criadora do NextJs, o que deixa tudo mais simples.
          </p>

          <p>
            Todo o código do projeto está nesse <LinkExternal link="https://github.com/FelipeFerreiraSS/felipeferreira.dev.br" text="repositório no GitHub"/>.
          </p>
          
          <h2>Tecnologias</h2>

          <Technologies>
            <ul>
              <p><SiNextdotjs size={30} color={'#ffffff'}/> Next JS</p>
              <p><GrReactjs size={30} color={'#34cddb'}/> React JS</p>
              <p><SiStyledcomponents size={30} color={'#D2698B'}/> Styled Components</p>
              <p><SiHtml5 size={30} color={'#E56027'}/> HTML 5</p>
              <p><SiCss3 size={30} color={'#0079C2'}/> CSS 3</p>
              <p><SiJavascript size={30} color={'#EAD41C'}/> Java Script</p>
              <p><SiMarkdown size={30} color={'#ffffff'}/> Markdown</p>
              <p><SiGit size={30} color={'#E44C30'}/> Git</p>
              <p><SiVercel size={30} color={'#ffffff'}/> Vercel</p>
            </ul>
          </Technologies>
          
          <h2>Figma</h2>

          <iframe 
            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}} 
            width="100%" 
            height="450" 
            src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FKMaiyKxKH76P8R4D5R4tZg%2FPersonal-website%3Fnode-id%3D0%253A1" 
            allowFullScreen>
          </iframe>
          
        </Post>
      </div>
    </MainPost>
  )
}

export default SiteBlog