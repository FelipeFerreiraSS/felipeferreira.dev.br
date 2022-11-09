import Link from "next/link";

const links = [
    { name: 'Blog', href: '/blog'},
    { name: 'Projetos', href: '/#projetos'},
    { name: 'Sobre', href: '/#sobre'},
    { name: 'Contato', href: '/#contato'},
]

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/FelipeFerreiraSS'},
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/felipeferreiradev/'},
    { name: 'E-mail', href: 'mailto:felipeferreirasilva.dev@gmail.com'},
    { name: 'CodePen', href: 'https://codepen.io/FelipeFerreira_ss'},
]

export default function Footer() {
    return (
        <div className='w-full bg-gray-800 text-gray-300 py-y px-2'>
        <div className='max-w-[1240px] mx-auto flex flex-col justify-between sm:flex-row border-t-2 border-gray-600 py-8'>
            <div className='col-span-2 pt-8 md:pt-2 mx-auto sm:mx-0 '>
                <h2 className='font-bold text-4xl text-white'>Felipe Ferreira</h2>
                <p className='py-4 text-1xl'>Desenvolvedor Front-End</p>
            </div>
            
            <div className='flex mx-auto sm:mx-0'>
                <div className='mr-20'>
                    <h6 className='font-bold uppercase pt-2'>Links</h6>
                    {links.map((link) => (
                        <ul>
                            <li className='py-1'>
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </li>
                        </ul>
                    ))}
                </div>
                <div>
                    <h6 className='font-bold uppercase pt-2'>Redes sociais</h6>
                    {socialLinks.map((link) => (
                        <ul>
                            <li className='py-1'>
                                <a href={link.href} target="_blank" rel="noopener noreferrer">
                                    {link.name}
                                </a>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
            
        </div>

        <div className='flex flex-col max-w-[1240px] px-2 mx-auto justify-center sm:flex-row text-center text-gray-500'>
            <p className='py-4'>© Copyright 2022 Felipe Ferreira</p>
        </div>
    </div>
    )
  }