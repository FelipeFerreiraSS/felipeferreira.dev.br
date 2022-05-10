import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import emailjs from 'emailjs-com'

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
    <div className={styles.container}>
      <Head>
        <title>Felipe Ferreira</title>
        <meta name="description" content="Desenvolvedor Front-End Jr" />
        <link rel="icon" href="/Component.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Home page
        </h1>

        <p className={styles.description}>
          Página inicial do site
        </p>

        <Link href={"/blog"}>
          <button>Blog</button>        
        </Link>

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

      </main>

      <footer className={styles.footer}>
        Blog desenvolvido por Felipe Ferreira
      </footer>
    </div>
  )
}
