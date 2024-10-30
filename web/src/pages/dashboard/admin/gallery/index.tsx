import DeleteAlert from "@/components/deleteAlert";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Uploader from "@/components/uploader";
import { useToast } from "@/hooks/use-toast";
import { deleteImage, fetchImagesList } from "@/store/features/image/truckFunctions";
import { AppDispatch, RootState } from "@/store/store";
import { Image as ImageType } from "@/types/Image";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";
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

  const groupedImages = useMemo(() => {
    return imagesState?.reduce<Record<string, ImageType[]>>((acc, image) => {
      const date = new Date(image.createdAt);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!acc[monthYear]) acc[monthYear] = [];
      acc[monthYear].push(image);
      return acc;
    }, {});
  }, [imagesState]);

  useEffect(() => {
    dispatch(fetchImagesList());  
  }, [dispatch])

  return(
    <Layout pageTitle="Galeria">
      <div className="container mx-auto p-4">
        <Dialog >
          <DialogTrigger>
            <Button className="mb-5">Adicionar imagem</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="mb-3">Adicionar uma nova imagem</DialogTitle>
              <DialogDescription>
                <Uploader />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      {groupedImages ? (
        <>
          {Object?.entries(groupedImages).map(([month, monthImages]) => (
            <section key={month} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{month[0].toUpperCase() + month.substring(1)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {monthImages.map((image) => (
                  <>
                    <Dialog >
                      <DialogTrigger>
                        <div key={image.id} className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                          <Image
                            src={image.imageUrl}
                            width={300}
                            height={300}
                            alt="Picture of the author"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      </DialogTrigger>
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
                                <div><DeleteAlert onConfirm={(result) => handleDeleteImage(result, image.id, image.imageUrl)} id={image.id} /></div>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </>
                ))}
              </div>
            </section>
          ))}
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <div className="animate-spin"><RefreshCw size={30} /></div>
        </div>
      )}
    </div>
    </Layout>
  )
}