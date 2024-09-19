import HeaderMenu from "@/components/headerMenu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchPostsList, getPostById, updatePost } from "@/store/features/post/truckFunctions";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostType } from "../../create-post";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Uploader from "@/components/uploader";
import { Input } from "@/components/ui/input";
import Select from 'react-select';
import { Textarea } from "@/components/ui/textarea";
import { fetchTagsList } from "@/store/features/tag/truckFunctions";
import { fetchImagesList } from "@/store/features/image/truckFunctions";
import { Image  as ImageType } from "@/types/Image";
import { Tag } from "@/types/Tag";

export default function EditPost() {
  const [slug, setSlug] = useState('')
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ id: number; imageUrl: string } | null>(null);
  
  const tagsState = useSelector((state: RootState) => state.tags)
  const imagesState = useSelector((state: RootState) => state.images.images)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<createPostType>()

  const router = useRouter();
  const { id } = router.query;

  const numericId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  const options = tagsState?.tags?.map(tag => ({
    value: tag.name,
    label: tag.name
  }));

  const handleImageClick = (image: ImageType) => {
    setSelectedImage({ id: image.id, imageUrl: image.imageUrl });
  };
  
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') 
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
  };

  const title = watch('title', '')

  async function handleUpdatePost(data: createPostType) {
    const tagsAsStrings = selectedTags.map(tag => tag.value);

    const dataPost = {
      ...data,
      slug: slug,
      tags: tagsAsStrings,
      headerImageId: selectedImage?.id
    }

    const isSuccess = await dispatch(updatePost(numericId, dataPost ))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso.",
      });
      dispatch(fetchPostsList()); 
      router.push("/dashboard/admin")
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha atualizar o usário.",
      });
    }
  }

  useEffect(() => {
    if (numericId) {
      const fetchPostData = async() => {
        const postData = await dispatch(getPostById(numericId));
        console.log(postData);
        
        if (postData) {
          setValue('title', postData.title);
          setValue('summary', postData.summary);
          setValue('content', postData.content);
          setSelectedImage({ 
            id: postData.headerImage.id, 
            imageUrl: postData.headerImage.imageUrl
          });
          const selectedTagOptions = postData.tags.map((tag: Tag) => ({
            value: tag.name,
            label: tag.name
          }));
          setSelectedTags(selectedTagOptions);
        }
        //setIsLoading(false);
      }
      fetchPostData();
    }
  }, [id, setValue, dispatch]);

  const handlePublish = () => {
    setValue('published', true);
  };

  const handleSave = () => {
    setValue('published', false);
  };

  useEffect(() => {
    setSlug(generateSlug(title))
  }, [title])

  useEffect(() => {
    dispatch(fetchTagsList())
    dispatch(fetchImagesList())
  }, [])
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
          <div>
            <Label htmlFor="title">Imagem de capa</Label>
            <Dialog>
              <DialogTrigger>
                {selectedImage ? (
                  <Image
                    src={selectedImage.imageUrl}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                    className="rounded-xl"
                  />
                ) : (
                  <div className="bg-slate-200 w-96 h-32 flex justify-center items-center rounded-xl">
                    <h3>Adicione uma imagem de capa</h3>
                  </div>
                )}
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="mb-3">Selecione uma imagem para capa</DialogTitle>
                  <DialogDescription>
                    <div>
                      <div className="mb-3">
                        <Uploader />
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {imagesState?.map((image) => (
                          <div 
                            key={image.id}
                            onClick={() => handleImageClick(image)}
                          >
                            <Image
                              src={image.imageUrl}
                              width={200}
                              height={200}
                              alt="Picture of the author"
                              className={`rounded-xl mb-3 cursor-pointer ${selectedImage?.id === image.id ? 'border-4 border-blue-500' : ''}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="default" className="bg-blue-500 ">
                      Salvar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(handleUpdatePost)}>
            <div>
              <Label htmlFor="title">Titulo</Label>
              <Input 
                {...register('title')}
                type="text" 
                id="title" 
                placeholder="Titulo" 
                autoComplete="titulo" 
                name="title"
              />
              <p>Slug: {slug}</p>
            </div>
            <div>
              <Label htmlFor="type">Tags</Label>
              <Select
                value={selectedTags}
                isMulti
                name="tags"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder='-- Selecione --'
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                onChange={(selectedOptions) => {
                  setSelectedTags(selectedOptions as { value: string; label: string }[]);
                }}
              />
            </div>
            <div>
              <Label htmlFor="summary">Resumo</Label>
              <Textarea
                placeholder="Resumo do post" 
                {...register('summary')} 
              />
            </div>
            <div>
              <Label htmlFor="content">Conteudo</Label>
              <Textarea
                placeholder="Conteudo do post" 
                {...register('content')} 
              />
            </div>
            <div className="flex gap-5">
              <Button
                type="submit"
                className="bg-blue-500 " 
                onClick={handleSave}
              >
                Salvar
              </Button>
              <Button
                {...register('published')} 
                type="submit"
                className="bg-blue-500 " 
                onClick={handlePublish}
              >
                Publicar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}