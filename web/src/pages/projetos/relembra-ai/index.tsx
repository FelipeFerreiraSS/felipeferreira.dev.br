import LayoutBlog from '@/components/layoutBlog';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function RelembraAi() {

  return (
    <LayoutBlog>
      <Head>
        {/* <meta charset="utf-8"/> */}
        <meta name="language" content="pt-BR"/>
        <title>Relembra.AI</title>
        <meta name="description" content={'O Relembra.AI é um aplicativo inteligente e intuitivo projetado para aprimorar suas habilidades de memorização e retenção de informações.'}/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content={'Relembra.AI'}/>
        <meta property="og:image" content="/capa-blog.png"/>
        <meta property="og:description" content={'O Relembra.AI é um aplicativo inteligente e intuitivo projetado para aprimorar suas habilidades de memorização e retenção de informações.'}></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content={'Relembra.AI'}/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content={'O Relembra.AI é um aplicativo inteligente e intuitivo projetado para aprimorar suas habilidades de memorização e retenção de informações.'}></meta>
      </Head>
      <main className="relative pb-16 overflow-hidden bg-gray-800">
        <header>
          <figure>
            <img className="max-w-2xl h-auto mx-auto rounded-xl object-cover" src="/relembra-ai-img.png" alt="print de projeto de uma página de blog" />
          </figure>
        </header>
        <section className="relative px-4 pt-5 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1 className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-100 sm:text-5xl">
              Relembra.AI
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
      Desenvolvi este projeto com o intuito de criar um portfólio que demonstre toda a minha experiência em desenvolvimento front-end, a qual venho acumulando ao longo de alguns anos.
    </p>
    <p>
      A proposta do projeto consiste em criar um aplicativo de memorização espaçada, projetado para auxiliar na memorização de diversos tipos de conteúdo, com foco especial em estudos de idiomas. A ideia para esse aplicativo surgiu quando comecei a aprender inglês.
    </p>
    <p>
      O funcionamento do aplicativo é o seguinte: cada vez que o usuário adiciona uma palavra e sua tradução, o aplicativo armazena esses dados. Posteriormente, o usuário pode testar sua memória em relação a essas palavras por meio de jogos. Após acertar ou errar, o usuário pode escolher quando deseja revisar a palavra novamente.
    </p>
    <p>
      Para a base tecnológica do projeto, optei pelo Next.js, um framework web que é fácil de trabalhar e escalável.
    </p>
    <p>
      Para a implementação do back-end e do banco de dados, escolhi o Firebase, devido à sua ampla gama de funções integradas, como autenticação por email e senha, além de ser de fácil integração, o que acelerou o desenvolvimento.
    </p>
    <p>
      Quanto à estilização, decidi utilizar o Tailwind CSS devido à sua alta produtividade, configuração flexível, reutilização de componentes e facilidade na criação de layouts responsivos.
    </p>
    <p>
      Para a criação de jogos baseados em IA, fiz uso da API da OpenAI, que oferece uma forma simples de adicionar inteligência artificial a projetos de diversas naturezas.
    </p>
    <p>
      Para testes, contei com o Jest e o Testing Library React.
    </p>
    <p>
      No que diz respeito ao versionamento de código, utilizei o Git em conjunto com o GitHub e o gerenciador de pacotes npm para a instalação de dependências e outros pacotes do projeto.
    </p>
    <p>
      Por fim, para hospedar o site, escolhi a plataforma da Vercel, que é a criadora do Next.js, tornando o processo de deploy mais simples.
    </p>
    <p>
      Todo o código do projeto está nesse 
      <a
        target="_blank"
        title="https://github.com/FelipeFerreiraSS/felipeferreira.dev.br"
        href="https://github.com/FelipeFerreiraSS/relembra.ai"
      >
        repositório no GitHub
      </a>.
    </p>
    <p>
      Acesse o aplicativo através deste link: 
      <a 
        title="https://relembra-ai.vercel.app/"
        href="https://relembra-ai.vercel.app/"
      >
        relembra-ai.vercel.app
      </a>.
    </p>

    <h2>Funcionalidades</h2>
    <ul>
      <li>Cadastro de usuário</li>
      <li>Login e autenticação de usuário</li>
      <li>CRUD completo</li>
      <li>Adição automática de imagem em novos cards</li>
      <li>Jogo de adivinhação de palavras cadastradas</li>
      <li>Lógica de repetição espaçada adaptativa</li>
      <li>Gráficos de acompanhamento do progresso de aprendizado</li>
      <li>Edição e exibição do perfil do usuário</li>
      <li>Sistema de níveis que aumenta conforme usuário realiza atividades</li>
      <li>Jogo de adivinhação de palavras com alternativas geradas por IA</li>
    </ul>

    <h2>Tecnologias</h2>
    <ul>
      <li>ReactJs</li>
      <li>NextJs</li>
      <li>TailwindCSS</li>
      <li>Firebase</li>
      <li>Unsplash API</li>
      <li>Axios</li>
      <li>Date-fns</li>
      <li>OpenAi</li>
      <li>React Icons</li>
      <li>recharts</li>
      <li>jest</li>
      <li>Testing Library React</li>
    </ul>

    <h2>Figma</h2>
    <p>
      Criei o design completo do app usando o Figma. Confira-o neste 
      <a
        title="https://www.figma.com/file/iLGmCd7jYDdRoID8nuLUk7/Untitled?type=design&node-id=0%3A1&mode=design&t=U3kwa7Cdjqk4iZs5-1"
        href="https://www.figma.com/file/iLGmCd7jYDdRoID8nuLUk7/Untitled?type=design&node-id=0%3A1&mode=design&t=U3kwa7Cdjqk4iZs5-1"
      >
        link
      </a>.
    </p>
  `
}
