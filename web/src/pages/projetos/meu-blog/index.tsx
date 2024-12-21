import LayoutBlog from '@/components/layoutBlog';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function MeuBlog() {

  return (
    <LayoutBlog>
      <Head>
        {/* <meta charset="utf-8"/> */}
        <meta name="language" content="pt-BR"/>
        <title>Meu site/blog</title>
        <meta name="description" content={'Projeto desenvolvido como o intuito de criar um blog para meu site, para que eu possa escrever posts e compartilhar meus estudos.'}/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content={'Meu site/blog'}/>
        <meta property="og:image" content="/capa-blog.png"/>
        <meta property="og:description" content={'Projeto desenvolvido como o intuito de criar um blog para meu site, para que eu possa escrever posts e compartilhar meus estudos.'}></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content={'Projeto desenvolvido como o intuito de criar um blog para meu site, para que eu possa escrever posts e compartilhar meus estudos.'}/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content={'Projeto desenvolvido como o intuito de criar um blog para meu site, para que eu possa escrever posts e compartilhar meus estudos.'}></meta>
      </Head>
      <main className="relative pb-16 overflow-hidden bg-gray-800">
        <header>
          <figure>
            <img className="h-auto mx-auto rounded-xl object-cover" src="/projectsImg.svg" alt="print de projeto de uma página de blog" />
          </figure>
        </header>
        <section className="relative px-4 pt-5 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1 className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-100 sm:text-5xl">
              Meu site/blog
            </h1>
          </div>
          
          <article className="mt-8 prose text-gray-100 dark:text-gray-100 prose-img:rounded-xl prose-img:mx-auto mx-auto lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          >
          </article>
        </section>
        
      </main>
    </LayoutBlog>
  )
}

const project = {
  contentHtml: `
    <h2>Sobre o projeto</h2>
    <p>
      Desenvolvi este projeto com o intuito de criar um blog para meu site, para que eu possa escrever posts e compartilhar meus estudos. 
      O blog é desenvolvido em NextJS e os posts são escritos em um Headless CMS facilitando muito a criação do conteúdo.
    </p>
    <p>
      A ideia principal do projeto é ter um blog que eu possa customizar da maneira que quiser e adicionar melhorias conforme vou aprendendo 
      novas tecnologias e novas habilidades.
    </p>
    <p>
      A principal tecnologia em que o blog é desenvolvido é NextJS, pois ele traz um dos principais requisitos para um blog, o SEO. 
      Como quero ser encontrado pelos mecanismos de busca, desenvolver o projeto com SEO era muito importante, por isso escolhi o NextJS.
    </p>
    <p>
      Para estilizar, escolhi o TailwindCSS por ser mais fácil de escrever os códigos já que não exige a criação de novas classes e pela 
      possibilidade de se criar componentes, deixando o desenvolvimento mais rápido.
    </p>
    <p>
      Para escrever os artigos, utilizei o Hygraph que é um Headless CMS. Trata-se de um sistema de gestão de conteúdo, como se fosse 
      um Back-End, usando como forma de armazenamento o GraphQL. Com ele, consigo escrever os posts de uma forma muito mais rápida e fácil.
    </p>
    <p>
      No versionamento de código, utilizei o Git com GitHub e o gerenciador de pacotes Yarn para instalar dependências e outros pacotes do projeto.
    </p>
    <p>
      Para hospedar o site, utilizei a plataforma da Vercel que é criadora do NextJS, deixando o deploy mais simples.
    </p>
    <p>
      Todo o código do projeto está nesse 
      <a target="_blank" title="https://github.com/FelipeFerreiraSS/felipeferreira.dev.br" href="https://github.com/FelipeFerreiraSS/felipeferreira.dev.br">
        repositório no GitHub
      </a>.
    </p>

    <h2>Tecnologias</h2>
    <ul>
      <li>Next JS</li>
      <li>React JS</li>
      <li>TailwindCSS</li>
      <li>HTML 5</li>
      <li>CSS 3</li>
      <li>JavaScript</li>
      <li>Hygraph</li>
      <li>GraphQL</li>
      <li>Git</li>
      <li>Vercel</li>
    </ul>

    <h2>Figma</h2>
    <p>
      Também desenvolvi toda a parte visual do blog no Figma que você pode ver nesse 
      <a target="_blank" title="https://www.figma.com/file/KMaiyKxKH76P8R4D5R4tZg/Personal-website?node-id=245%3A160" href="https://www.figma.com/file/KMaiyKxKH76P8R4D5R4tZg/Personal-website?node-id=245%3A160">
        link
      </a>.
    </p>
  `
}