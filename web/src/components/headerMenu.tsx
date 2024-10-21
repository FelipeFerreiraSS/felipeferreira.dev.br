'use client'
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import ThemeToggle from "./themeToggle";
import Image from "next/image";
import { CircleUserRound } from 'lucide-react';

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
        <div className="flex justify-center items-center">
          <div className="mr-3">
            {userState.user?.profileImageUrl ? (
              <Image
                src={userState.user?.profileImageUrl}
                width={50}
                height={50}
                alt="Picture of the author"
                className="rounded-full"
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "100%" }}
                priority
              />
            ) : (
              <CircleUserRound size={50}/> 
            )}
          </div>
          <div>
            <p>{userState.user?.firstName}</p>
            <p>{userState.user?.type === 'admin' ? 'Administrador' : 'Editor'}</p>
          </div>
        </div>
        {/* <ThemeToggle /> */}
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
  {
    id: 2,
    url: '/tags',
    name: 'Tags'
  },
  {
    id: 3,
    url: '/gallery',
    name: 'Gallery'
  },
]

const menuListEditor = [
  {
    id: 0,
    url: '/profile',
    name: 'Pefil'
  },
]