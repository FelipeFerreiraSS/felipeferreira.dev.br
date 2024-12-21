export default function Presentation() {
  return (
    <>
      <section className='bg-gray-800 text-gray-300'>
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16">
            <div className="lg:py-24">

              <h2 className="text-2xl text-center py-2 sm:text-2xl sm:text-left lg:text-4xl">Olá, eu sou</h2>
              <h1 className="text-4xl text-center py-2 font-bold sm:text-5xl sm:text-left lg:text-6xl">Felipe Ferreira</h1>
              <h2 className="text-2xl text-center py-2 sm:text-2xl sm:text-left lg:text-4xl">Desenvolvedor Front-End</h2>
              
              <div className="text-center sm:text-start">
                <a
                href="https://www.linkedin.com/in/felipeferreiradev/"
                target="_blank" rel="noopener noreferrer"
                className="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                <span className="text-lg">Linkedin</span>
                </a>

                <a
                href="https://github.com/FelipeFerreiraSS"
                target="_blank" rel="noopener noreferrer"
                className="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                >
                <span className="text-lg">GitHub</span>
                </a>
              </div>
            </div>
            <div className="relative h-1/2 hidden rounded-lg sm:block">
                <img
                alt="Party"
                src='/developer.svg'
                className="object-cover w-full lg:w-3/4 m-auto"
                />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}