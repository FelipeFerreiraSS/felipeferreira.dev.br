import { useWindowSize } from "@/hooks/useWindowSize";
import Header from "./header";
import Sidebar from "./sidebar";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
  pageTitle: string
}

export default function Layout({ children, pageTitle }: LayoutProps) {
  const { width } = useWindowSize();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const adjustedWidth = width !== undefined 
    ? width - (isCollapsed ? 82 : 258) 
    : 0;

  return (
    <div className={`${inter.className} flex h-screen`}>
      <div className="hidden sm:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      </div>
      <div className="flex flex-col flex-1">
        <Header pageTitle={pageTitle}/>
        <main 
          className="flex-1 p-4 overflow-x-auto transition-all duration-300 "
          style={{ maxWidth: width !== undefined && width > 386 ? `${adjustedWidth}px` : '100%' }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}