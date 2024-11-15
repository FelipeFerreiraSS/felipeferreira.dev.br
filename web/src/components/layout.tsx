import { useWindowSize } from "@/hooks/useWindowSize";
import Header from "./header";
import Sidebar from "./sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
  pageTitle: string
}

export default function Layout({ children, pageTitle }: LayoutProps) {
  const { width, height } = useWindowSize();
  console.log('width', width);
  console.log('height', height);
  
  const adjustedWidth = width !== undefined ? width - 82 : 0;
  
  return (
    <div className={`${inter.className} flex h-screen`}>
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Header pageTitle={pageTitle}/>
        <main 
          className="flex-1 p-4 overflow-x-auto scrollbar-custom"
          style={{ maxWidth: width !== undefined && width > 386 ? `${adjustedWidth}px` : '100%' }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}