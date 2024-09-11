'use client'
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function HeaderMenu() {
  const userState = useSelector((state: RootState) => state.user);
  
  return (
    <div className="w-full flex items-center justify-center px-6 py-12">
       <div className="gap-5 flex justify-between items-center">
        <div className="flex gap-5">
          <Button 
            className="bg-blue-500" 
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          {userState.user?.type === 'admin' ? (
            menuListAdmin.map((itens) => (
              <Button 
                className="bg-blue-500"
                key={itens.id}
              >
                <Link href={`/dashboard/${userState.user?.type}${itens.url}`}>{itens.name}</Link>
              </Button>
            ))
          ) : (
            menuListEditor.map((itens) => (
              <Button 
                className="bg-blue-500"
                key={itens.id}
              >
                <Link href={`/dashboard/${userState.user?.type}${itens.url}`}>{itens.name}</Link>
              </Button>
            ))
          )}
        </div>
        <div>
          <p>Bem vindo {userState.user?.type === 'admin' ? 'Administrador' : 'Editor'}: {userState.user?.firstName}</p>
        </div>
      </div>
    </div>
  )
}

const menuListAdmin = [
  {
    id: 0,
    url: '/users',
    name: 'Usuários'
  },
  {
    id: 1,
    url: '/profile',
    name: 'Pefil'
  },
]

const menuListEditor = [
  {
    id: 0,
    url: '/profile',
    name: 'Pefil'
  },
]