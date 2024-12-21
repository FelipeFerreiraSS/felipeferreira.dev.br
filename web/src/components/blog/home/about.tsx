import Link from "next/link";

export default function About() {
    return (
    <section id="sobre" className="bg-gray-800 text-gray-300">
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 bg-gray-800 text-gray-300">
    <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:items-center sm:gap-x-16">
      <div className="mx-auto max-w-lg text-center lg:mx-0 sm:text-left">
        <h2 className="text-3xl font-bold sm:text-4xl">Sobre mim</h2>

        <p className="mt-4 max-w-[400px]">
          Ola, eu sou o Felipe Ferreira, desenvolvedor front-end com foco em desenvolvimento
          Web e estudante de análise e desenvolvimento de sistemas.
        </p>

        <p className="mt-4 max-w-[400px]">
          Possuo conhecimento nas principais tecnologias de desenvolvimento web, criação de
          interfaces, desenvolvimento de layout responsivo, deploy de aplicações, SEO e
          versionamento de código.
        </p>

        <div className="w-full mt-3 flex items-center justify-center sm:max-w-[200px]">
          <a href="https://github.com/FelipeFerreiraSS" target="_blank" rel="noopener noreferrer">
            <img
              src='/techIcons/github_icon.svg'
              className="w-10 mr-3"
            />
          </a>
          <a href="https://www.linkedin.com/in/felipeferreiradev/" target="_blank" rel="noopener noreferrer">
            <img
              src='/techIcons/linkedin_icon.svg'
              className="w-10 mr-3"
            />
          </a>
          <a href='mailto:felipeferreirasilva.dev@gmail.com' target="_blank" rel="noopener noreferrer">
            <img
              src='/techIcons/email_icon.svg'
              className="w-10 mr-3"
            />
          </a>
          <a href='https://codepen.io/FelipeFerreira_ss' target="_blank" rel="noopener noreferrer">
            <img
              src='/techIcons/codepen_icon.svg'
              className="w-10"
            />
          </a>
        </div>

        <div className="text-center sm:text-start">
          <a
          href="https://drive.google.com/file/d/19TO_iJRghUgcJqdFXBGHAfP0_PWsMpVy/view?usp=share_link" target="_blank" rel="noopener noreferrer"
          className="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
          <span className="text-lg">Currículo</span>
          </a>

          <Link
          href="/#contact"
          >
            <span className="cursor-pointer text-lg mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
            Contato</span>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-3xl text-center font-bold sm:text-4xl lg:text-left">Conhecimentos</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/reactjs_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">React js</p>
          </div>

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/nextjs_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">Next js</p>
          </div>

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/git_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">Git</p>
          </div>

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/html5_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">HTML 5</p>
          </div>

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/css3_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">CSS 3</p>
          </div>

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/javascript_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">Java Script</p>
          </div>

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/figma_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">Figma</p>
          </div>

          <div className="flex flex-col items-center p-4 shadow-sm">
            <span className="inline-block p-3">
              <img
                src='/techIcons/tailwindcss_icon.svg'
              />
            </span>

            <p className="mt-2 text-2xl font-bold text-center">Tailwind CSS</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

    )
}