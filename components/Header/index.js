import Link from "next/link";
import Image from "next/image";
import { Navbar, Avatar, Menu } from './styles.js'

export default function Header() {
    return (
    <Navbar>
        <Avatar>
            <Image 
                src={"/foto-de-perfil.png"} 
                alt={"avatar img"}
                width={"80px"}
                height={"80px"}
            />
            <h2>Felipe Ferreira</h2>
        </Avatar>
        <Menu>
            <ul>
                <li>
                    <Link href={'#'}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={'#'}>
                        Blog
                    </Link>
                </li>
                <li>
                    <Link href={'#'}>
                        Projetos
                    </Link>
                </li>
                <li>
                    <Link href={'#'}>
                        Contato
                    </Link>
                </li>
            </ul>
        </Menu>
    </Navbar>
    )
}