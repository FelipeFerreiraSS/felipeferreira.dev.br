import HeaderMenu from "@/components/headerMenu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function EditPost() {
  const router = useRouter();
  return(
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <HeaderMenu />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <div className="flex justify-between">
            <h1>Editar post</h1>
            <Button
              className="bg-blue-500 "
              onClick={() => router.back()} 
            >
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}