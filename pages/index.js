import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import emailjs from 'emailjs-com'

import { Main, Cover, Description, Img } from '../styles/home'

export default function Home() {

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
            <div>
              <a href='https://www.linkedin.com/in/felipeferreiradev/'>
                <button>Linkedin</button>
              </a>
              <a href='https://github.com/FelipeFerreiraSS'>
                <button>GitHub</button>
              </a>
            </div>
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

        <section>
          <h2>
            Sobre
          </h2>
        </section>

        <section>
          <h2>
            Projetos
          </h2>
        </section>

        <section>
          <h2>
            Ultimos posts no blog
          </h2>
        </section>

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
