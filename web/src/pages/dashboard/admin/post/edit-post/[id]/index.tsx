import HeaderMenu from "@/components/headerMenu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchPostsList, getPostById, updatePost } from "@/store/features/post/truckFunctions";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import Prism from 'prismjs'
import 'highlight.js/styles/monokai-sublime.css' 
import hljs from 'highlight.js' 
import { LoadingSpinner } from "@/components/loadingSpinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorMessage from "@/components/formErrorMessage";
import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, CircleAlert, ImagePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";

const editPostSchema = z.object({
  title: z.string().min(1 ,'O titulo é obrigatório'),
  summary: z.string().min(1, 'O resumo é obrigatório').max(255, 'O resumo não pode ter mais que 255 caracteres'),
  published: z.boolean(),
  selectedImage: z.preprocess((val) => (val === null || val === undefined ? '' : val), 
    z.string().min(1, 'A imagem é obrigatória')
  ),
  selectedTags: z.array(z.string()).min(1, 'Selecione ao menos uma tag'),
});

type TagOption = { value: string; label: string };

export type EditPostSchema = z.infer<typeof editPostSchema>

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { 'list': 'check' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image', 'video', 'blockquote', 'code-block', 'formula'],
    ['clean'],
  ],
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value, 
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
]

export default function EditPost() {
  const [slug, setSlug] = useState('')
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ id: number; imageUrl: string } | null>(null);
  const [postValue, setPostValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [readTime, setReadTime] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tagsState = useSelector((state: RootState) => state.tags)
  const imagesState = useSelector((state: RootState) => state.images.images)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<EditPostSchema>({
    resolver: zodResolver(editPostSchema),
    defaultValues: { selectedTags: [] },
  })

  const router = useRouter();
  const { id } = router.query;

  const numericId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  const options = tagsState?.tags?.map(tag => ({
    value: tag.name,
    label: tag.name
  }));

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleImageClick = (image: ImageType) => {
    setSelectedImage({ id: image.id, imageUrl: image.imageUrl });
    setValue('selectedImage', image.imageUrl)
    if (image.imageUrl) {
      clearErrors('selectedImage');
    }
  };
  
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') 
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
  };

  function calculateReadingTime(text: string) {
    const wordsPerMinute = 210; // Velocidade de leitura
    const wordsArray = text.trim().split(/\s+/); // Divide o texto em palavras
    const wordCount = wordsArray.length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute); // Calcula o tempo e arredonda para cima
    
    return readingTime;
   }

  function addIdsToHeadings(content: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
  
    const headings = doc.querySelectorAll("h2, h3, h4, h5");
  
    headings.forEach(heading => {
      const text = heading.textContent || "";
      const id = text.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      heading.setAttribute("id", id);
    });

    return doc.body.innerHTML;
  }

  const title = watch('title', '')

  async function handleUpdatePost() {
    setIsLoading(true)
    const tagsAsStrings = selectedTags.map(tag => tag.value);

    const dataPost = {
      title: getValues('title'),
      summary: getValues('summary'),
      published: getValues('published'),
      selectedImage: getValues('selectedImage'),
      selectedTags: getValues('selectedTags'),
      slug: slug,
      tags: tagsAsStrings,
      headerImageId: selectedImage?.id,
      content: addIdsToHeadings(postValue),
      readTime: `${readTime}`
    }

    const isSuccess = await dispatch(updatePost(numericId, dataPost ))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso.",
      });
      dispatch(fetchPostsList()); 
      router.push("/dashboard/admin/post")
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha atualizar o usário.",
      });
    }
    setIsLoading(false)
  }
  
  const handlePublish = () => {
    setValue('published', true);
    handleUpdatePost();
  };
  
  const handleSave = () => {
    setValue('published', false);
    handleUpdatePost();
  };
  
  const getValuePublished = getValues('published')

  useEffect(() => {
    if (numericId) {
      const fetchPostData = async() => {
        const postData = await dispatch(getPostById(numericId));
        
        if (postData) {
          setValue('title', postData.title);
          setValue('summary', postData.summary);
          setPostValue(postData.content)
          setSelectedImage({ 
            id: postData.headerImage?.id, 
            imageUrl: postData.headerImage?.imageUrl
          });
          if (postData.headerImage?.imageUrl) {
            setValue('selectedImage', postData.headerImage.imageUrl)
          }
          const selectedTagOptions: TagOption[] = postData.tags.map((tag: Tag) => ({
            value: tag.name,
            label: tag.name,
          }));

          setSelectedTags(selectedTagOptions);
          setValue('selectedTags', selectedTagOptions.map((option: TagOption) => option.value));
          clearErrors('selectedTags');
        }
        //setIsLoading(false);
      }
      fetchPostData();
    }
  }, [id, setValue, dispatch, clearErrors]);

  const summary = watch('summary');

  useEffect(() => {
    if (summary?.length > 255) {
      setError('summary', { type: 'manual', message: 'O resumo não pode ter mais que 255 caracteres' });
    } else {
      clearErrors('summary');
    }
  }, [summary, setError, clearErrors]);
  
  useEffect(() => {
    setSlug(generateSlug(title))
    setReadTime(calculateReadingTime(postValue))
  }, [title, postValue])

  useEffect(() => {
    dispatch(fetchTagsList())
    dispatch(fetchImagesList())
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  }, [postValue])

  return(
    <Layout pageTitle="Editar post">
      <div className="mb-5">
        <Button
          className="bg-blue-600 text-white shadow hover:bg-blue-500 focus-visible:outline-blue-600"
          onClick={() => router.back()} 
        >
          Voltar
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <Card className="w-full lg:w-[40%] h-full">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="mb-2">Detalhes</CardTitle>
              <CardDescription>
                Adicione a imagem de capa, insira o título, selecione as tags  
                e escreva um resumo do conteúdo.
              </CardDescription>
              {isCollapsed && Object.keys(errors).length > 1 ? (
                <FormErrorMessage error={"Preecha todos os campos antes de salvar"} />
              ) : null}
            </div>
            <div className="sm:hidden">
              <button
                className="px-2 py-1"
                onClick={toggleCollapse}
              >
                {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
              </button>
            </div>
          </CardHeader>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isCollapsed ? "max-h-0 overflow-hidden" : "max-h-[600px] overflow-y-auto"
            }`}
          >
            <CardContent>
              <div className="flex flex-col">
                <Label htmlFor="title" className="mb-5">Imagem de capa</Label>
                <Dialog>
                  <DialogTrigger className="w-[50%]">
                    {selectedImage && selectedImage?.imageUrl  ? (
                      <Image
                        src={selectedImage.imageUrl}
                        width={300}
                        height={300}
                        alt="Picture of the author"
                        className="rounded-xl mb-3"
                      />
                    ) : (
                      <>
                        <Card>
                          <CardContent className="flex justify-center items-center h-28">
                            <ImagePlus className="mt-5"/>
                          </CardContent>
                        </Card>
                        <FormErrorMessage error={errors.selectedImage?.message} />
                      </>
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
                        <Button type="button" variant="default" className="bg-blue-600 text-white shadow hover:bg-blue-500 focus-visible:outline-blue-600">
                          Salvar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <form className="space-y-6">
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
                  <FormErrorMessage error={errors.title?.message}/>
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
                      const selectedValues = selectedOptions.map((option) => option.value);
                      setValue('selectedTags', selectedValues);
                      if (selectedValues.length > 0) {
                        clearErrors('selectedTags');
                      }
                    }}
                  />
                  <FormErrorMessage error={errors.selectedTags?.message} />
                </div>
                <div>
                  <Label htmlFor="summary">Resumo</Label>
                  <Textarea
                    placeholder="Resumo do post" 
                    {...register('summary')} 
                  />
                  <FormErrorMessage error={errors.summary?.message}/>
                </div>
              </form>
            </CardContent>
          </div>
        </Card>
        <Card className="w-full lg:w-[60%]">
          <CardHeader>
            <CardTitle>Conteúdo</CardTitle>
            <CardDescription>
              Escreva o conteúdo do post e 
              visualize uma prévia do resultado final.
            </CardDescription> 
          </CardHeader>
          <CardContent className="h-full">
            <Tabs defaultValue="post" className="w-full">
              <TabsList>
                <TabsTrigger value="post">Post</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="post">
                <div className="flex flex-col">
                  <ReactQuill
                    value={postValue}
                    onChange={setPostValue}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    className="rounded-lg shadow-md mb-5"
                  />
                  <div className="flex justify-end gap-5">
                    <Button
                      type="submit"
                      className="bg-blue-600 text-white shadow hover:bg-blue-500 focus-visible:outline-blue-600" 
                      onClick={handleSave}
                      disabled={isLoading || getValuePublished}
                    >
                      Salvar {isLoading && !getValuePublished ? <LoadingSpinner /> : null}
                    </Button>
                    <Button
                      {...register('published')} 
                      type="submit"
                      className="bg-blue-600 text-white shadow hover:bg-blue-500 focus-visible:outline-blue-600" 
                      onClick={handlePublish}
                      disabled={isLoading || getValuePublished}
                    >
                      Publicar {isLoading && getValuePublished ? <LoadingSpinner /> : null} 
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="preview">
                {postValue && postValue !== '<p><br></p>' ? (
                  <div
                    className="prose prose-lg mt-8 max-w-[330px] sm:max-w-full"
                    dangerouslySetInnerHTML={{ __html: postValue }}
                  />
                ):(
                  <div>
                    <Alert variant={"destructive"}>
                      <CircleAlert />
                      <AlertTitle>Prévia Indisponível</AlertTitle>
                      <AlertDescription>
                        Escreva o conteúdo do post para visualizar a prévia.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //const apiClient = getAPIClient(ctx)
  //const { ['felipeferreirablog.token']: token } = parseCookies(ctx)

  const authResult = await authenticateUser(ctx);
  
  if ('redirect' in authResult) {
    return authResult; // Retorna o redirecionamento se necessário
  }

  const { userType } = authResult.props;

  if (userType !== 'admin') {
    return {
      redirect: {
        destination: '/dashboard/editor', // Redireciona para o editor se não for admin
        permanent: false,
      },
    };
  }

  // Chamada API do lado do servidor
  //await apiClient.get('/users')

  return {
    props: {}
  }
}