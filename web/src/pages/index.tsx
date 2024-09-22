import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
      <h1 className="text-blue-500">Home</h1>
      <Button className="bg-blue-500 " variant={'link'}>
        <Link href="/login">login</Link>
      </Button>
      <Button className="bg-blue-500 " variant={'link'}>
        <Link href="/blog">Blog</Link>
      </Button>
    </div>
    </main>
  );
}
