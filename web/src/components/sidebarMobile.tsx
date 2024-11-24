import { ChevronsLeft, ChevronsRight, Images, LayoutDashboard, LogOut, Menu, NotebookText, Tags, UserRoundPen, Users } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { sidebarAdminItems, sidebarEditorItems } from "./sidebar";

export default function SidebarMobile() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userState = useSelector((state: RootState) => state.user);
  const { signOut } = useContext(AuthContext)

  const router = useRouter();
  
  const isActive = (path: string, type: string | undefined) => {
    const basePath = `/dashboard/${type}`;
    const currentPath = router.pathname
      .split('/')
      .slice(0, 4)
      .join('/');

    if (path === '/') {
      return currentPath === basePath;
    }

    return currentPath === `${basePath}${path}`;
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <Sheet>
      <SheetTrigger>
        <div 
          className="flex items-center text-zinc-800 dark:text-gray-200 px-5 py-2 cursor-pointer"
          onClick={toggleSidebar}
        >
          <Menu/>
        </div>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle><span className={`text-2xl font-bold`}>Logo</span></SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          {userState.user?.type === 'admin' ? (
            <ul className="mt-6">
              {sidebarAdminItems.map((item, index) => (
                <Link href={`/dashboard/${userState.user?.type}${item.link}`} key={index}>
                  <li
                    className={`rounded-lg mb-1 relative group flex items-center px-3 py-2 hover:bg-gray-200 hover:dark:bg-zinc-800 cursor-pointer 
                      ${isActive(item.link, userState.user?.type) ? 'bg-gray-200 dark:bg-zinc-800' : ''}
                      
                    `}
                  >
                    <div className="text-xl w-8 flex justify-center">
                      <span>{item.icon}</span>
                    </div>
                    <p className="ml-4">{item.label}</p>
                  </li>
                </Link>
              ))}
            </ul>
          ):(
            <ul className="mt-6">
              {sidebarEditorItems.map((item, index) => (
                <Link href={`/dashboard/${userState.user?.type}${item.link}`} key={index}>
                  <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                    <span className="text-xl">{item.icon}</span>
                    {!isCollapsed && <span className="ml-4">{item.label}</span>}
                  </li>
                </Link>
              ))}
            </ul>
          )}
          <div className="mb-10">
            <ThemeToggle />
            <ul>
              <li className="mt-1 rounded-lg flex items-center px-3 py-2 hover:bg-gray-200 hover:dark:bg-zinc-800 cursor-pointer" onClick={() => signOut()}>
                <div className="text-xl w-8 flex justify-center">
                  <span><LogOut /></span>
                </div>
                <p className="ml-4">Sair</p>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

