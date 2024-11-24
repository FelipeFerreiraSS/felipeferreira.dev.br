import { RootState } from "@/store/store";
import { Bell, ChevronDown, CircleUserRound, UserRoundPen } from "lucide-react";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SidebarMobile from "./sidebarMobile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type HeaderProps = {
  pageTitle: string
}

export default function Header({ pageTitle }: HeaderProps) {
  const userState = useSelector((state: RootState) => state.user);
  return(
    <div className="h-20 text-zinc-800 border-r-gray-200 dark:border-r-zinc-800 border-b-[2px] dark:text-gray-200 transition-transform duration-300 flex items-center">
      <div className="block sm:hidden">
        <SidebarMobile />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="sm:ml-5 text-4xl font-bold">
          <h1>{pageTitle}</h1>
        </div>
        <div className="h-full mr-5 flex justify-center items-center">
          <div className="mr-5 text-xl hover:bg-gray-200 hover:dark:bg-zinc-800 h-12 w-12 flex items-center justify-center rounded-full cursor-pointer">
            <Bell />
            <div className="-mt-7 -ml-2 w-2 h-2 bg-red-500 flex items-center justify-center rounded-full"></div>
          </div>
          <div className="mr-3">
            {userState.user?.profileImageUrl ? (
              <Avatar className="w-12 h-12">
                <AvatarImage className="object-cover" src={userState.user?.profileImageUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <CircleUserRound size={50}/> 
            )}
          </div>
          <div className="hidden sm:block">
            <p>{userState.user?.firstName}</p>
            <p>{userState.user?.type === 'admin' ? 'Administrador' : 'Editor'}</p>
          </div>
          <div className="hidden sm:block">
            <Popover>
              <PopoverTrigger>
                <div className="ml-2 hover:bg-gray-200 hover:dark:bg-zinc-800 h-12 w-12 flex items-center justify-center rounded-full cursor-pointer">
                  <ChevronDown />
                </div>
              </PopoverTrigger>
              <PopoverContent className="max-w-44 mr-7 mt-5 p-2">
                <Link href={'/dashboard/admin/profile'}>
                  <div className="flex cursor-pointer gap-3 px-2 py-2 rounded-lg hover:bg-gray-200 hover:dark:bg-zinc-800">
                    <UserRoundPen />
                    <p>Editar perfil</p>
                  </div>
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}