import LayoutBlog from "@/components/layoutBlog";
import Head from "next/head";
import Link from "next/link";

export default function Error404() {
  return (
    <LayoutBlog>
      <Head>
        {/* <meta charset="utf-8"/> */}
        <meta name="language" content="pt-BR"/>
        <title>Felipe Ferreira Dev | Blog</title>
        <meta name="description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"/>
        <meta name="robots" content="all"/>
        <meta name="author" content="Felipe Ferreira"/>
        <meta name="keywords" content="HTML, CSS, JavaScript ReactJs, NextJS"/>
        <link rel="icon" type="image/x-icon" href="https://avatars.githubusercontent.com/u/65501165?v=4"></link>

        <meta property="og:type" content="page"/>
        <meta property="og:url" content="felipeferreira.dev.br"/>
        <meta property="og:title" content="Felipe Ferreira Dev | Blog"/>
        <meta property="og:image" content="/capa-blog.png"/>
        <meta property="og:description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"></meta>

        <meta property="article:author" content="Felipe Ferreira"></meta>

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@"/>
        <meta name="twitter:title" content="Felipe Ferreira Dev | Blog"/>
        <meta name="twitter:creator" content="@"/>
        <meta name="twitter:description" content="Blog sobre desenvolvimento web e Front-End. Falo sobre HTML, CSS, JavaScript, ReactJS, NextJS"></meta>
      </Head>
      <main className="bg-gray-800 flex items-center justify-center mt-10">
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 md:text-7xl mb-5">
            <span className="block text-white xl:inline">404</span>
          </h1>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <span className="block text-white xl:inline">Ooops!</span>
          </h2>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            <span className="block text-white xl:inline">Página não encontrada</span>
          </h2>
          <p className="mt-3 text-base text-white sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
            A página que você está procurando não existe ou foi removida
          </p>
          <p className="text-base text-white sm:mx-auto sm:max-w-xl sm:text-lg md:text-xl lg:mx-0">
            Recomendamos que você volte para a Home.
          </p>
          <div className="mt-5 flex justify-center mb-8">
            <button className="inline-block rounded border border-transparent bg-indigo-600 px-8 py-2 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring active:text-indigo-500">
              <Link
                href="/"
              >
                Home
              </Link>
            </button>              
          </div>
        </div>
      </main>
    </LayoutBlog>
  )
}