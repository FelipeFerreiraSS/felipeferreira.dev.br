import Link from "next/link";
import Image from "next/image";

import { SiteFooter, Links, Copyright } from './styles.js'

export default function Footer() {
    return (
        <footer>
            <SiteFooter>
                <div>
                    <Link href={'/'}>
                        <h2>Felipe Ferreira</h2>
                    </Link>
                    <p>Obrigado por ler!</p>
                </div>

                <Links>
                    <div>
                    <h4>Links</h4>
                    <ul>
                        <li>
                            <Link href={'/#about'}>
                                Sobre
                            </Link>
                        </li>
                        <li>
                            <Link href={'/blog'}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href={'/#projects'}>
                                Projetos
                            </Link>
                        </li>
                        <li>
                            <Link href={'/#contact'}>
                                Contato
                            </Link>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <h4>Redes sociais</h4>
                    <ul>
                        <li>
                            <a href='https://github.com/FelipeFerreiraSS' target="_blank">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com/in/felipeferreiradev/' target="_blank">
                                Linkedin
                            </a>
                        </li>
                        <li>
                            <a href="mailto:felipeferreirasilva.dev@gmail.com" target="_blank">
                                Email
                            </a>
                        </li>
                        <li>
                            <a href='https://codepen.io/FelipeFerreira_ss' target="_blank">
                                CodePen
                            </a>
                        </li>
                    </ul>
                </div>
                </Links>
            </SiteFooter>

            <Copyright>
                <p>© Copyright 2022 Felipe Ferreira</p>
            </Copyright>
        </footer>
    )
}