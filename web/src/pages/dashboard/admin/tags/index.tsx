import { 
  ArrowDown10, 
  ArrowDownAZ, 
  ArrowUp10, 
  ArrowUpAZ,
  CircleCheckBig,
  NotebookText,
  Pencil,
  PencilLine, 
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PopoverContent } from "@/components/ui/popover";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import DeleteAlert from "@/components/deleteAlert";
import FormErrorMessage from "@/components/formErrorMessage";
import Layout from "@/components/layout";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createTag, deleteTag, fetchTagsList, updateTag } from "@/store/features/tag/truckFunctions";
import { AppDispatch, RootState } from "@/store/store";
import { Tag } from "@/types/Tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const editCriateTagSchema = z.object({
  name: z.string().min(1 ,'O nome é obrigatório').optional(),
  editName: z.string().min(1, 'O nome é obrigatório').optional(),
});

export type EditCriateTagSchema = z.infer<typeof editCriateTagSchema>

type TagKey = keyof Tag; 

export default function Tags() {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectSearchQuery, setSelectSearchQuery] = useState('');
  const [filterTags, setFilterTags] = useState('');
  const [filterCreationDate, setFilterCreationDate] = useState('');
  const [filterUpdateDate, setFilterUpdateDate] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditCriateTagSchema>({
    resolver: zodResolver(editCriateTagSchema)
  })

  const dispatch: AppDispatch = useDispatch()

  const tagState = useSelector((state: RootState) => state.tags)
  const { toast } = useToast()

  async function handleCreateTag(data: EditCriateTagSchema) {
    setIsLoading(true)
  
    const createData = { ...data, name: data.name };
  
    const result = await dispatch(createTag(createData));
    
    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Tag criada com sucesso.",
      });
      setValue('name', '');
      dispatch(fetchTagsList());
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: `${result.error.error}`,
      });
    }
    setIsLoading(false)
  }

  async function handleUpdateTag(data: EditCriateTagSchema) {
    setIsLoading(true)
    const updatedData = { ...data, name: data.editName };

    const result = await dispatch(updateTag(editingTag?.id, updatedData ))
    
    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Tag atualizada com sucesso.",
      });
      setValue('editName', '')
      dispatch(fetchTagsList()); 
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: `${result.error.error}`,
      });
    }
    setIsLoading(false)
  }

  async function handleDeleteTag(result: boolean, id: number) {
    if (result) {
      const result = await dispatch(deleteTag(id))
  
      if (result.success) {
        toast({
          title: "Sucesso",
          description: "Tag deletada com sucesso.",
        });
        dispatch(fetchTagsList());  
        reset()
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: `${result.error.error}`,
        });
      }
    }
  }

  async function handleEditTag(tag: Tag) {
    setEditingTag(tag); // Setar a tag que será editada
    setValue('editName', tag.name); // Definir o valor no formulário de edição
  }

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...(tagState?.tags || [])].sort((a, b) => {
    if (sortConfig.key) {
      const key = sortConfig.key as TagKey;
      const aKey = a[key];
      const bKey = b[key];
      if (aKey == null || bKey == null) {
        return aKey == null ? -1 : 1;
      }
      if (sortConfig.direction === 'asc') {
        return aKey > bKey ? 1 : -1;
      } else {
        return aKey < bKey ? 1 : -1;
      }
    }
    return 0;
  });

  const isSameDate = (date1: string, date2: string) => {
    const [year, month, day] = date2.split("-");
    let d2 = `${day}/${month}/${year}`;
    
    return date1 === d2
  };

  const filteredData = sortedData?.filter((item) => {
    let matchesSearchQuery = true;
    let matchesFilterTags = true;
    let matchesFilterCreationDate = true;
    let matchesFilterUpdateDate = true;

    if (selectSearchQuery === 'name' && searchQuery) {
      matchesSearchQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    } 

    if (filterCreationDate) {
      matchesFilterCreationDate = isSameDate(new Date(item.createdAt).toLocaleDateString(), filterCreationDate);
    }

    if (filterUpdateDate) {
      matchesFilterUpdateDate = isSameDate(new Date(item.updatedAt).toLocaleDateString(), filterUpdateDate);
    }

    return matchesSearchQuery && matchesFilterTags && matchesFilterCreationDate && matchesFilterUpdateDate;
  });

  const cleanFilters = () => {
    setSearchQuery('')
    setSelectSearchQuery('');
    setFilterTags('');
    setFilterCreationDate('');
    setFilterUpdateDate('');
    setCurrentPage(1);
    handleSort('')
  }

  const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const searchFor = () => {
    if (selectSearchQuery === 'name') {
      return 'nome'
    }  else {
      return null
    }
  }

  useEffect(() => {
    if (!tagState.tags) {
      dispatch(fetchTagsList());  
    }
  }, [dispatch, tagState.tags])

  useEffect(() => {
    if (
      filterTags || 
      filterCreationDate || 
      filterUpdateDate || 
      sortConfig ||
      (selectSearchQuery && searchQuery)
    ) {
      setCurrentPage(1);
    }
  }, [selectSearchQuery, searchQuery, filterTags, filterCreationDate, filterUpdateDate, sortConfig]);
  
  // O `useEffect` garante que o componente só renderize no cliente, evitando erros de "hydration-error" no Next.js.
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return(
    <Layout pageTitle="Tags">
      <div className="p-4">
        <div className="flex justify-between mb-5">
          <div>
            <Popover>
              <PopoverTrigger className="bg-blue-500 py-2 px-3 hover:bg-black text-white rounded-sm" >
                Criar Tag
              </PopoverTrigger>
              <PopoverContent>
                <form className="space-y-6" onSubmit={handleSubmit(handleCreateTag)}>
                  <div>
                    <Input 
                      {...register("name")}
                      type="text" 
                      id="name" 
                      placeholder="Tag" 
                      autoComplete="Tag" 
                      name="name"
                    />
                    <FormErrorMessage error={errors.name?.message}/>
                  </div> 
                  <div>
                    <SubmitButton isLoading={isLoading}>
                      Salvar
                    </SubmitButton>
                  </div>
                </form> 
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-5">
            <Input
              type="text"
              placeholder={`Pesquisar por ${searchFor() || '...'} `}
              className="p-2 w-48 border border-gray-300 rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select 
              onValueChange={(value) => setSelectSearchQuery(value)}
              value={selectSearchQuery}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Selecione</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger>
                <Button
                  className="bg-blue-500 rounded"
                >
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col gap-4 mb-4">
                      <p>Data de criação</p>
                      <Input
                        type="date"
                        className="p-2 border border-gray-300 rounded max-w-40"
                        value={filterCreationDate}
                        onChange={(e) => setFilterCreationDate(e.target.value)}
                      />
                      <p>Data de atualização</p>
                      <Input
                        type="date"
                        className="p-2 border border-gray-300 rounded max-w-40"
                        value={filterUpdateDate}
                        onChange={(e) => setFilterUpdateDate(e.target.value)}
                      />
                    </div>
                    <Button
                      className="p-2 bg-blue-500 rounded"
                      onClick={() => {cleanFilters()}}
                    >
                      Limpar Filtros
                    </Button>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <Table className="min-w-full border-collapse">
            {filteredData?.length === 0 ? (
              <TableCaption>Nenhum resultado encontrado</TableCaption>
            ) : null}
            <TableHeader>
              <TableRow>
                <TableHead 
                  className={`cursor-pointer select-none hover:text-blue-500 ${sortConfig.key === 'id' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('id')}
                >
                  <span className="flex">
                    ID 
                    {sortConfig.key === 'id' && sortConfig.direction === 'asc' ? <ArrowUp10 /> : <ArrowDown10 />}
                  </span>
                </TableHead>
                <TableHead
                  className={`cursor-pointer select-none hover:text-blue-500 ${sortConfig.key === 'name' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('name')}
                >
                  <span className="flex">
                    Nome
                    {sortConfig.key === 'name' && sortConfig.direction === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
                  </span>
                </TableHead>
                <TableHead>Posts</TableHead>
                <TableHead
                  className={`cursor-pointer select-none hover:text-blue-500 ${sortConfig.key === 'createdAt' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('createdAt')}
                >
                  <span className="flex">
                    Criação
                    {sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? <ArrowUp10 /> : <ArrowDown10 />}
                  </span>
                </TableHead>
                <TableHead
                  className={`cursor-pointer select-none hover:text-blue-500 ${sortConfig.key === 'updatedAt' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('updatedAt')}
                >
                  <span className="flex">
                    Atualização
                    {sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? <ArrowUp10 /> : <ArrowDown10 />}
                  </span>
                </TableHead>
                <TableHead>Editar</TableHead>
                <TableHead>Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData?.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.id}</TableCell>
                  <TableCell>{tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}</TableCell>
                  <TableCell className="flex items-center gap-x-2">
                    {tag.posts?.length > 0 ? tag.posts?.length : null}
                    {tag.posts?.length > 0 ? (
                      <Dialog >
                        <DialogTrigger>
                          <NotebookText />
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl overflow-y-auto max-h-5/6">
                          <DialogHeader>
                            <DialogTitle className="mb-3">Posts utilizando a tag {tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}</DialogTitle>
                            <DialogDescription className="flex flex-row items-center justify-center text-black">
                              <Table className="min-w-full border-collapse">
                                {filteredData?.length === 0 ? (
                                  <TableCaption>Nenhum resultado encontrado</TableCaption>
                                ) : null}
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Título</TableHead>
                                    <TableHead>Criação</TableHead>
                                    <TableHead>Atualização</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {tag.posts?.map((post) => (
                                    <TableRow key={post.id}>
                                      <TableCell className="font-medium">{post.id}</TableCell>
                                      <TableCell
                                      >
                                        {post.published ? 
                                          <Badge className="bg-green-400 text-black gap-2"><CircleCheckBig size={15} /> Publicado</Badge> 
                                          : 
                                          <Badge className="bg-yellow-400 text-black gap-2"><PencilLine size={15}/>Escrevendo</Badge>
                                        }
                                      </TableCell>
                                      <TableCell>{post.title}</TableCell>
                                      <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                      <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    ): (
                      <div>
                        <p className="flex justify-center items-center">0</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{new Date(tag.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(tag.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                  <Popover>
                      <PopoverTrigger>
                        <button 
                          className="hover:bg-blue-500 p-2 rounded-full hover:text-white"
                          onClick={() => handleEditTag(tag)}
                        >
                          <Pencil />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent>
                      <form className="space-y-6" onSubmit={handleSubmit(handleUpdateTag)}>
                        <div>
                          <Input 
                            {...register('editName')}
                            type="text" 
                            id="editName" 
                            placeholder="Tag"
                            autoComplete="Tag" 
                            name="editName"
                          />
                          <FormErrorMessage error={errors.editName?.message}/>
                        </div> 
                        <div>
                          <SubmitButton isLoading={isLoading}>
                            Salvar
                          </SubmitButton>
                        </div>
                      </form> 
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    <DeleteAlert onConfirm={(result) => handleDeleteTag(result, tag.id)} id={tag.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination className="flex justify-center mt-4 space-x-2">
          <div className="flex justify-center items-center gap-3">
            <p>Items por pagina</p>
            <Select onValueChange={(value) => setItemsPerPage(parseInt(value))}>
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="90">90</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PaginationContent>

            {/* Botão Anterior */}
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  if(currentPage > 1) {
                    e.preventDefault();
                    changePage(currentPage - 1);
                  }
                }}
                className={`${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                PreviousText="Anterior"
              >
              </PaginationPrevious>
            </PaginationItem>

            {/* Números de Página */}
            {Array.from({ length: totalPages }, (_, page) => {
              const pageNumber = page + 1;
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    className={`p-2 cursor-pointer ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      changePage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Botão Próximo */}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  if(currentPage < totalPages) {
                    e.preventDefault();
                    changePage(currentPage + 1);
                  }
                }}
                className={`${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                NextText="Próxima"
              >
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-4xl mb-5">
          <div className="w-full flex justify-between">
            <h2>Lista de Tags</h2>
            <Popover>
              <PopoverTrigger className="bg-blue-500 py-2 px-3 hover:bg-black text-white rounded-sm" >
                Criar Tag
              </PopoverTrigger>
              <PopoverContent>
                <form className="space-y-6" onSubmit={handleSubmit(handleCreateTag)}>
                  <div>
                    <Input 
                      {...register("name")}
                      type="text" 
                      id="name" 
                      placeholder="Tag" 
                      autoComplete="Tag" 
                      name="name"
                    />
                    <FormErrorMessage error={errors.name?.message}/>
                  </div> 
                  <div>
                    <SubmitButton isLoading={isLoading}>
                      Salvar
                    </SubmitButton>
                  </div>
                </form> 
              </PopoverContent>
            </Popover>
          </div>
          <table border={1} cellPadding="10" cellSpacing="0" className="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Posts</th>
                <th>Data de criação</th>
                <th>Data de atualização</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {tagState.tags?.map((tag) => (
                <tr key={tag.id} className="border-black border-2 ">
                  <td>{tag.id}</td>
                  <td>{tag.name}</td>
                  <td>{tag.posts?.length}</td>
                  <td>{new Date(tag.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(tag.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Popover>
                      <PopoverTrigger onClick={() => handleEditTag(tag)}>
                        ✏️
                      </PopoverTrigger>
                      <PopoverContent>
                      <form className="space-y-6" onSubmit={handleSubmit(handleUpdateTag)}>
                        <div>
                          <Input 
                            {...register('editName')}
                            type="text" 
                            id="editName" 
                            placeholder="Tag"
                            autoComplete="Tag" 
                            name="editName"
                          />
                          <FormErrorMessage error={errors.editName?.message}/>
                        </div> 
                        <div>
                          <SubmitButton isLoading={isLoading}>
                            Salvar
                          </SubmitButton>
                        </div>
                      </form> 
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td><DeleteAlert onConfirm={(result) => handleDeleteTag(result, tag.id)} id={tag.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </Layout>
  )
}