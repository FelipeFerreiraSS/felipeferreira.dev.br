import { RootState } from "@/store/store";
import { Bell, ChevronDown, CircleUserRound, UserRoundPen } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type HeaderProps = {
  pageTitle: string
}

export default function Header({ pageTitle }: HeaderProps) {
  const userState = useSelector((state: RootState) => state.user);
  return(
    <div className="h-20 w-full text-black border-b-black dark:text-gray-200 dark:border-b-gray-200 transition-all duration-300 border-b-2 flex justify-between items-center">
      <div className="ml-5 text-4xl font-bold">
        <h1>{pageTitle}</h1>
      </div>
      <div className="h-full mr-5 flex justify-center items-center">
        <div className="mr-5 text-xl hover:bg-slate-300 h-12 w-12 flex items-center justify-center rounded-full cursor-pointer">
          <Bell />
          <div className="-mt-7 -ml-2 w-2 h-2 bg-red-500 flex items-center justify-center rounded-full"></div>
        </div>
        <div className="mr-3">
          {userState.user?.profileImageUrl ? (
            <Image
              src={userState.user?.profileImageUrl}
              width={50}
              height={50}
              alt="Picture of the author"
              className="rounded-full"
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "100%" }}
            />
          ) : (
            <CircleUserRound size={50}/> 
          )}
        </div>
        <div>
          <p>{userState.user?.firstName}</p>
          <p>{userState.user?.type === 'admin' ? 'Administrador' : 'Editor'}</p>
        </div>
          <Popover>
            <PopoverTrigger>
              <div className="mr-5 hover:bg-slate-300 h-12 w-12 flex items-center justify-center rounded-full cursor-pointer">
                <ChevronDown />
              </div>
            </PopoverTrigger>
            <PopoverContent className="max-w-40 mr-10 mt-7">
              <div className="flex cursor-pointer gap-3">
                <UserRoundPen />
                <p>Editar perfil</p>
              </div>
            </PopoverContent>
          </Popover>
      </div>
    </div>
  )
}