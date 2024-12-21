import Link from "next/link"
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: 'Blog', href: '/blog'},
  { name: 'Projetos', href: '/#projetos'},
  { name: 'Contato', href: '/#contato'},
]

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {openMenu ? (
                <span 
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setOpenMenu(false)}
                >
                  <X className="block h-6 w-6" aria-hidden="true" />
                </span>
              ) : (
                <span 
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setOpenMenu(true)}  
                >
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                </span>
              )}
          </div>
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  className="block h-10 w-auto rounded-full lg:hidden cursor-pointer"
                  src="https://avatars.githubusercontent.com/u/65501165?v=4"
                  alt="felipe ferreira dev foto de perfil"
                />
              </Link>
              <Link href="/">
                <img
                  className="hidden h-12 w-auto rounded-full lg:block cursor-pointer"
                  src="https://avatars.githubusercontent.com/u/65501165?v=4"
                  alt="felipe ferreira dev foto de perfil"
                />
              </Link>
              <Link href="/">
                <p className="text-white px-3 py-2 font-bold text-1xl sm:text-2xl cursor-pointer">Felipe Ferreira</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-end">
            <div className="hidden sm:ml-6 sm:block">
                <nav className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                        {item.name}
                      </p>
                    </Link>
                  ))}
                </nav>
              </div>
          </div>
        </div>
      </div>
                  
      {openMenu ? (
        <div className="sm:hidden">
          <nav className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  {item.name}
                </p>
              </Link>
            ))}
          </nav>
        </div>
      ): null}
    </header>
  )
}