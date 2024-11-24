import { ChevronsLeft, ChevronsRight, Images, LayoutDashboard, LogOut, NotebookText, Tags, UserRoundPen, Users } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export interface SidebarItem {
  icon: JSX.Element;
  label: string;
  link: string
}

export const sidebarAdminItems: SidebarItem[] = [
  { icon: <LayoutDashboard />, label: 'Dashboard', link: '/' },
  { icon: <NotebookText />, label: 'Posts', link: '/post' },
  { icon: <Users />, label: 'Usuários', link: '/users' },
  { icon: <Tags />, label: 'Tags', link: '/tags' },
  { icon: <Images />, label: 'Galeria', link: '/gallery' },
  { icon: <UserRoundPen />, label: 'Pefil', link: '/profile' },
];

export const sidebarEditorItems: SidebarItem[] = [
  { icon: <LayoutDashboard />, label: 'Dashboard', link: '/dashboard' },
];

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({isCollapsed, setIsCollapsed}: SidebarProps) {
  const userState = useSelector((state: RootState) => state.user);
  const { signOut } = useContext(AuthContext)

  const router = useRouter();
  
  const isActive = (path: string, type: string | undefined) => {
    const currentPath = `/dashboard/${type}`;
    
    if (path === "/" && router.pathname === currentPath) {
      return true;
    }
    
    return router.pathname === `${currentPath}${path}`;
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onlyOpenSidebar = () => {
    setIsCollapsed(false)
  }

  return (
    <div className={`h-screen text-zinc-800 border-r-gray-200 dark:border-r-zinc-800 border-r-[2px] dark:text-gray-200 transition-all duration-300 flex flex-col justify-between ${
      isCollapsed ? "w-20" : "w-64"
    }`}>
      <div>
        <div className="flex items-center justify-between p-4">
          <span className={`ml-2 text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Logo</span>
          <span
            onClick={toggleSidebar}
            className="hover:bg-gray-200 hover:dark:bg-zinc-800 px-3 py-2 rounded-lg cursor-pointer -ml-1"
          >
            {isCollapsed ? <ChevronsRight size={30}/> : <ChevronsLeft size={30}/>}
          </span>
        </div>
        {userState.user?.type === 'admin' ? (
          <ul className="mt-6 ml-3 mr-3">
            {sidebarAdminItems.map((item, index) => (
              <Link href={`/dashboard/${userState.user?.type}${item.link}`} key={index}>
                <li
                  className={`rounded-lg mb-1 relative group flex items-center px-3 py-2 hover:bg-gray-200 hover:dark:bg-zinc-800 cursor-pointer 
                    ${isActive(item.link, userState.user?.type) ? 'bg-gray-200 dark:bg-zinc-800' : ''}
                  `}
                  onMouseEnter={onlyOpenSidebar}
                >
                  <div className="text-xl w-8 flex justify-center">
                    <span>{item.icon}</span>
                  </div>
                  {!isCollapsed && <span className="ml-4">{item.label}</span>}
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
      </div>
      <div className="m-3" onMouseEnter={onlyOpenSidebar}>
        <ThemeToggle isCollapsed={isCollapsed}/>
        <ul>
          <li className="mt-1 rounded-lg flex items-center px-3 py-2 hover:bg-gray-200 hover:dark:bg-zinc-800 cursor-pointer" onClick={() => signOut()}>
            <div className="text-xl w-8 flex justify-center">
              <span><LogOut /></span>
            </div>
            {!isCollapsed && <span className="ml-4">Sair</span>}
          </li>
        </ul>
      </div>
    </div>
  )
}

