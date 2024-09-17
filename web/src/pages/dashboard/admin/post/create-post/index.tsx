import HeaderMenu from "@/components/headerMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createPost, fetchPostsList } from "@/store/features/post/truckFunctions";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export type createPostType = {
  title: string,
  slug: string,
  published: boolean,
  headerImageId: number,
  summary: string,
  content: string,
  tags: []
}

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    unregister,
    formState: { errors },
  } = useForm<createPostType>()
  const router = useRouter()
  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  const [slug, setSlug] = useState('')

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') 
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
  };

  const title = watch('title', '')

  async function handleCreatePost(data: createPostType) {
    const dataPost = {
      ...data,
      slug: slug
    }
    console.log(dataPost);
    
    const isSuccess = await dispatch(createPost(dataPost))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso.",
      });
      dispatch(fetchPostsList());  
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao deletar usário.",
      });
    }
  }

  const handlePublish = () => {
    setValue('published', true);
  };

  // Função para lidar com o botão "Salvar"
  const handleSave = () => {
    setValue('published', false);
  };

  useEffect(() => {
    setSlug(generateSlug(title))
  }, [title])
  
  return(
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <HeaderMenu />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <div className="flex justify-between">
            <h1>Criar post</h1>
            <Button
              className="bg-blue-500 "
              onClick={() => router.back()} 
            >
              Voltar
            </Button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(handleCreatePost)}>
            <div>
              <Label htmlFor="title">Imagem de capa</Label>
              {/* <Uploader /> */}
            </div>
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