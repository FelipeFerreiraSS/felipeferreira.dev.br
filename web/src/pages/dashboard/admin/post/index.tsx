import DeleteAlert from "@/components/deleteAlert";
import Layout from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverContent } from "@/components/ui/popover";
import { 
  ArrowDown10, 
  ArrowDownAZ, 
  ArrowUp10, 
  ArrowUpAZ, 
  CircleCheckBig, 
  ImageOff, 
  Pencil, 
  PencilLine 
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
import { useToast } from "@/hooks/use-toast";
import { authenticateUser } from "@/services/auth";
import { deletePost, fetchPostsList } from "@/store/features/post/truckFunctions";
import { AppDispatch, RootState } from "@/store/store";
import { Post } from "@/types/Post";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type PostKey = keyof Post; 

export default function Posts() {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectSearchQuery, setSelectSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTags, setFilterTags] = useState('');
  const [filterCreationDate, setFilterCreationDate] = useState('');
  const [filterUpdateDate, setFilterUpdateDate] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);
  const dispatch: AppDispatch = useDispatch()
  const { toast } = useToast()

  const postsState = useSelector((state: RootState) => state.posts)

  async function handleDeletePost(result: boolean, id: number) {
    const isSuccess = await dispatch(deletePost(id))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Post deletado com sucesso.",
      });
      dispatch(fetchPostsList());  
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao deletar post.",
      });
    }
  }

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...(postsState?.posts || [])].sort((a, b) => {
    if (sortConfig.key) {
      const key = sortConfig.key as PostKey;
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
    let matchesFilterStatus = true;
    let matchesFilterTags = true;
    let matchesFilterCreationDate = true;
    let matchesFilterUpdateDate = true;

    if (selectSearchQuery === 'title' && searchQuery) {
      matchesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectSearchQuery === 'summary') {
      matchesSearchQuery = item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectSearchQuery === 'author') {
      matchesSearchQuery = `${item.author.firstName} ${item.author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (filterStatus) {
      matchesFilterStatus = item.published.toString() === filterStatus;
    }

    if (filterTags) {
      matchesFilterTags = item.tags.some(tag => tag.name === filterTags);
    }

    if (filterCreationDate) {
      matchesFilterCreationDate = isSameDate(new Date(item.createdAt).toLocaleDateString(), filterCreationDate);
    }

    if (filterUpdateDate) {
      matchesFilterUpdateDate = isSameDate(new Date(item.updatedAt).toLocaleDateString(), filterUpdateDate);
    }

    return matchesSearchQuery && matchesFilterStatus && matchesFilterTags && matchesFilterCreationDate && matchesFilterUpdateDate;
  });

  const cleanFilters = () => {
    setSearchQuery('')
    setSelectSearchQuery('');
    setFilterStatus('');
    setFilterTags('');
    setFilterCreationDate('');
    setFilterUpdateDate('');
    setCurrentPage(1);
    handleSort('')
  }

  const allTags = Array.from(
    new Set(postsState?.posts?.flatMap((post) => post.tags.map((tag) => tag.name)))
  );

  const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const searchFor = () => {
    if (selectSearchQuery === 'title') {
      return 'titulo'
    } else if (selectSearchQuery === 'summary') {
      return 'resumo'
    } else if (selectSearchQuery === 'author') {
      return 'autor'
    } else {
      return null
    }
  }

  useEffect(() => {
    if (!postsState.posts) {
      dispatch(fetchPostsList());  
    }
  }, [])

  useEffect(() => {
    if (
      filterStatus || 
      filterTags || 
      filterCreationDate || 
      filterUpdateDate || 
      sortConfig ||
      (selectSearchQuery && searchQuery)
    ) {
      setCurrentPage(1);
    }
  }, [selectSearchQuery, searchQuery, filterStatus, filterTags, filterCreationDate, filterUpdateDate, sortConfig]);
  
  // O `useEffect` garante que o componente só renderize no cliente, evitando erros de "hydration-error" no Next.js.
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return(
    <Layout pageTitle="Posts">
      <div>
        <div className="flex justify-between mb-5">
          <Button
            className="bg-blue-500 " 
          >
            <Link href={'/dashboard/admin/post/create-post'}>Criar post</Link>
          </Button>
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
                <SelectItem value="title">Titulo</SelectItem>
                <SelectItem value="summary">Resumo</SelectItem>
                <SelectItem value="author">Autor</SelectItem>
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
                      <p>Status</p>
                      <Select 
                        onValueChange={(value) => setFilterStatus(value)}
                        value={filterStatus}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Publicado</SelectItem>
                          <SelectItem value="false">Rascunho</SelectItem>
                        </SelectContent>
                      </Select>
                      <p>Tags</p>
                      <Select 
                        onValueChange={(value) => setFilterTags(value)}
                        value={filterTags}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Tags" />
                        </SelectTrigger>
                        <SelectContent>
                        {allTags.map((tag) => (
                          <SelectItem key={tag} value={tag}>{tag.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}</SelectItem>
                        ))}
                        </SelectContent>
                      </Select>
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
                  className={`cursor-pointer select-none hover:text-blue-500 ${sortConfig.key === 'published' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('published')}
                >
                  <span className="flex">
                    Status
                    {sortConfig.key === 'published' && sortConfig.direction === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
                  </span>
                </TableHead>
                <TableHead>Capa</TableHead>
                <TableHead
                  className={`cursor-pointer select-none hover:text-blue-500 ${sortConfig.key === 'title' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('title')}
                >
                  <span className="flex">
                    Título
                    {sortConfig.key === 'title' && sortConfig.direction === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
                  </span>
                </TableHead>
                <TableHead>Resumo</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead
                  className={`w-32 hover:text-blue-500 cursor-pointer select-none ${sortConfig.key === 'author.firstName' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('author.firstName')}
                >
                  <span className="flex">
                    Autor
                    {sortConfig.key === 'author.firstName' && sortConfig.direction === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
                  </span>
                </TableHead>
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
                <TableHead className="text-right">Editar</TableHead>
                <TableHead className="text-right">Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData?.map((post) => (
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
                  <TableCell>
                    {post.headerImage?.imageUrl ? (
                      <Image
                        src={post.headerImage?.imageUrl ?? '/default-image.png'}
                        width={150}
                        height={200}
                        alt="Picture of the author"
                        className="rounded-xl min-w-32 min-h-20"
                      />
                    ) : (
                      <div className="flex gap-2 items-center justify-center w-36 h-9 text-black dark:text-white rounded-xl"
                      >
                        <ImageOff />Post sem capa
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.summary}</TableCell>
                  <TableCell>
                    {post.tags.length > 4 ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline"> Ver tags</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto">
                          <ol>
                            {post.tags.map((tag) => (
                              <li key={tag.id}>
                                {tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                              </li>
                            ))}
                          </ol>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <ol>
                        {post.tags.map((tag) => (
                          <li key={tag.id}>
                            {tag.name.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)) .join(' ')}
                          </li>
                        ))}
                      </ol>
                    )}
                  </TableCell>
                  <TableCell>{post.author.firstName} {post.author.lastName}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/admin/post/edit-post/${post.id}`}>
                      <button className="hover:bg-blue-500 p-2 rounded-full hover:text-white"><Pencil /></button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DeleteAlert onConfirm={(result) => handleDeletePost(result, post.id)} id={post.id} />
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