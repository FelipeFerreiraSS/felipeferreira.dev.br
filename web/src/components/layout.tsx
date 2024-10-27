import Header from "./header";
import Sidebar from "./sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
  pageTitle: string
}

export default function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <div className={`${inter.className} flex h-screen`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header pageTitle={pageTitle}/>
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}