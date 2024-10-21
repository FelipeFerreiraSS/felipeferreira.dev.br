import DeleteAlert from "@/components/deleteAlert";
import Layout from "@/components/layout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Uploader from "@/components/uploader";
import { useToast } from "@/hooks/use-toast";
import { deleteImage, fetchImagesList } from "@/store/features/image/truckFunctions";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Gallery() {
  const imagesState = useSelector((state: RootState) => state.images.images);
  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()
  
  async function handleDeleteImage(result: boolean, id: number, url: string) {
    const isSuccess = await dispatch(deleteImage(id, url))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Imagem deletada com sucesso.",
      });
      dispatch(fetchImagesList());  
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao deletar imagem.",
      });
    }
  }

  useEffect(() => {
    dispatch(fetchImagesList());  
  }, [dispatch])

  return(
    <Layout pageTitle="Galeria">
      <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
        <div className="mx-auto w-full max-w-4xl mb-5">
          <h2>Imagens</h2>
          <Uploader />
          <div className="grid grid-cols-3 gap-2">
            {imagesState?.map((image) => (
              <div 
                key={image.id}
                className="m-5 flex"
              >
                <Dialog >
                  <DialogTrigger>
                    <Image
                      src={image.imageUrl}
                      width={300}
                      height={300}
                      alt="Picture of the author"
                      className="rounded-xl"
                    />
                  </DialogTrigger>
                  <div><DeleteAlert onConfirm={(result) => handleDeleteImage(result, image.id, image.imageUrl)} id={image.id} /></div>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="mb-3"></DialogTitle>
                      <DialogDescription className="flex flex-row items-center justify-center text-black">
                        <div>
                          <Image
                            src={image.imageUrl}
                            width={700}
                            height={700}
                            alt="Picture of the author"
                            className="rounded-xl mb-3 "
                          />
                          <p>Informações da imagem</p>
                          <div className="flex gap-3">
                            <p>Id: {image.id}</p>
                            <p>Data de criação: {new Date(image.createdAt).toLocaleDateString()}</p>
                            <p>Post vinculados: {image.posts.length}</p>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}