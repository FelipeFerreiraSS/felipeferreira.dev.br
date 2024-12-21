import { Inter } from "next/font/google";
import NavBar from "./blog/navBar";
import Footer from "./blog/footer";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: React.ReactNode;
}

export default function LayoutBlog({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
    // <>
    //   <NavBar />
    //     {children}
    //   <Footer />
    // </>
  )
}