import Link from "next/link";

export default function Footer() {
    return (
        <div className="relative overflow-hidden bg-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center sm:text-center lg:text-left">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-5">
                <span className="block text-white xl:inline">404</span>
              </h1>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                <span className="block text-white xl:inline">Ooops!</span>
              </h2>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                <span className="block text-white xl:inline">Página não encontrada</span>
              </h2>
              <p className="mt-3 text-base text-white sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Esta página não existe ou foi removida!
              </p>
              <p className="text-base text-white sm:mx-auto sm:max-w-xl sm:text-lg md:text-xl lg:mx-0">
                Recomendo que volte para a Home
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
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
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex flex-col mt-0 md:-mt-12">
        <img
          className="h-72 w-full object-cover sm:h-80 md:h-auto lg:h-full lg:w-full"
          src='/404-error.svg'
          alt=""
        />
        <a 
            className="text-base text-center text-white mt-0 md:-mt-24 text-opacity-50"
            href="https://storyset.com/web" 
            target="_blank" 
            rel="noopener noreferrer"
        >
            Web illustrations by Storyset
        </a>
      </div>
    </div>
    )
  }