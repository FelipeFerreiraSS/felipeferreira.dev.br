import Link from "next/link";

export default function Projects() {
    return (
      <section className='bg-gray-800 text-gray-300'>
        <div id="projetos" class="mx-auto max-w-screen-xl px-4 py-4 sm:py-16 sm:px-6 lg:px-8">
          <h2 class="text-3xl text-center font-bold sm:text-4xl">Projetos</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div className="group relative">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/projectsImg.svg"
                  alt="print de projeto de uma página de blog"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-2 text-3xl text-gray-100 font-semibold text-center lg:text-start">
                Meu blog/site
              </h3>
              <p class="text-sm text-gray-300 mt-2 text-center lg:text-start">
                Projeto desenvolvido como o intuito de criar um blog para meu site, 
                para que eu possa escrever posts e compartilhar meus estudos.
              </p>
              <div class="flex justify-center lg:justify-start">
                <Link href="/projetos/meu-blog">
                  <button
                    class="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                  >
                    <span class="text-lg">Veja o projeto</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="group relative">
              <div className="w-2/3 mx-auto rounded-lg">
                <img
                  src="/relembra-ai-img.png"
                  alt="imagem de um programador trabalhando em um projeto"
                  className="object-cover object-center"
                />
              </div>
              <h3 className="mt-2 text-3xl text-gray-100 font-semibold text-center lg:text-start">
                Relembra.AI
              </h3>
              <p class="text-sm text-gray-300 mt-2 text-center lg:text-start">
                App de memorização espaçada com foco em aprendizado de idiomas.
                Com games e atividades geradas por inteligência artificial
              </p>
              <div class="flex justify-center lg:justify-start">
                <Link href="/projetos/relembra-ai">
                  <button
                    class="mt-4 mr-3 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    >
                    <span class="text-lg">Veja o projeto</span>
                  </button>
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    )
  }