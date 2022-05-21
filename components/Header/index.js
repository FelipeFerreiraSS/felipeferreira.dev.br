import Link from "next/link";
import Image from "next/image";
import { NavBar, Avatar, Menu } from './styles.js'

export default function Header() {
    return (
    <NavBar>
        <Avatar>
            <Link href={'/'}>
                <Image 
                    src={"/foto-de-perfil.png"} 
                    alt={"avatar img"}
                    width={"80px"}
                    height={"80px"}
                />  
            </Link>
            <Link href={'/'}>
                    <h2>Felipe Ferreira</h2>
                </Link>
        </Avatar>
        <Menu>
            <ul>
                <li>
                    <Link href={'#about'}>
                        Sobre
                    </Link>
                </li>
                <li>
                    <Link href={'/blog'}>
                        Blog
                    </Link>
                </li>
                <li>
                    <Link href={'#projects'}>
                        Projetos
                    </Link>
                </li>
                <li>
                    <Link href={'#contact'}>
                        Contato
                    </Link>
                </li>
            </ul>
        </Menu>
    </NavBar>
    )
}