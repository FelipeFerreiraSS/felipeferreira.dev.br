import { ChevronsLeft, ChevronsRight, Images, LayoutDashboard, LogOut, NotebookText, Tags, UserRoundPen, Users } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

interface SidebarItem {
  icon: JSX.Element;
  label: string;
  link: string
}

const sidebarAdminItems: SidebarItem[] = [
  { icon: <LayoutDashboard />, label: 'Dashboard', link: '/' },
  { icon: <NotebookText />, label: 'Posts', link: '/post' },
  { icon: <Users />, label: 'Usuários', link: '/users' },
  { icon: <Tags />, label: 'Tags', link: '/tags' },
  { icon: <Images />, label: 'Galeria', link: '/gallery' },
  { icon: <UserRoundPen />, label: 'Pefil', link: '/profile' },
];

const sidebarEditorItems: SidebarItem[] = [
  { icon: <LayoutDashboard />, label: 'Dashboard', link: '/dashboard' },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
  return (
    <div className={`h-screen  text-black border-r-black  dark:border-r-gray-200 border-r-2 dark:text-gray-200 transition-all duration-300 flex flex-col justify-between ${
      isCollapsed ? "w-20" : "w-64"
    }`}>
      <div>
        <div className="flex items-center justify-between p-4">
          <span className={`text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Logo</span>
          <Button
            variant="ghost"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronsRight size={30}/> : <ChevronsLeft size={30}/>}
          </Button>
        </div>
        {userState.user?.type === 'admin' ? (
          <ul className="mt-6 ml-3">
            {sidebarAdminItems.map((item, index) => (
              <Link href={`/dashboard/${userState.user?.type}${item.link}`} key={index}>
                  <li
                    className={`relative group flex items-center p-2 hover:bg-gray-700 cursor-pointer ${
                      isActive(item.link, userState.user?.type) ? 'bg-gray-500' : ''
                    }`}
                  >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && <span className="ml-4">{item.label}</span>}
                  {isCollapsed && (
                    <span className="absolute left-20 bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  )}
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
      <div className="m-3">
        <ThemeToggle isCollapsed={isCollapsed}/>
        <ul>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={() => signOut()}>
            <span className="text-xl"><LogOut /></span>
            {!isCollapsed && <span className="ml-4">Sair</span>}
          </li>
        </ul>
      </div>
    </div>
  )
}

