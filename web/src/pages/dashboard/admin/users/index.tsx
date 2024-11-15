'use client'

import { 
  ArrowDown10, 
  ArrowDownAZ, 
  ArrowUp10, 
  ArrowUpAZ, 
  CircleCheckBig, 
  Crown, 
  NotebookText, 
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
import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteUser, fetchUsersList } from "@/store/features/user/truckFunctions";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import DeleteAlert from "@/components/deleteAlert";
import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@/types/User";

type PostKey = keyof User

export default function Users() {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectSearchQuery, setSelectSearchQuery] = useState('');
  const [filterUserType, setFilterUserType] = useState('');
  const [filterCreationDate, setFilterCreationDate] = useState('');
  const [filterUpdateDate, setFilterUpdateDate] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);
  const usersState = useSelector((state: RootState) => state.user.users);
  const userState = useSelector((state: RootState) => state.user.user);

  const { toast } = useToast()

  const dispatch: AppDispatch = useDispatch()

  async function handleDeleteUser(result: boolean, id: number) {
    if (userState?.id === id) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Você não pode deletar o seu próprio perfil.",
      });
    } else {
      if (result) {
        const isSuccess = await dispatch(deleteUser(id))
    
        if (isSuccess) {
          toast({
            title: "Sucesso",
            description: "Usuário deletado com sucesso.",
          });
          dispatch(fetchUsersList());  
        } else {
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Falha ao criar novo usário.",
          });
        }
      }
    }
  }

  
  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...(usersState || [])].sort((a, b) => {
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
    let matchesFilterUserType = true;
    let matchesFilterCreationDate = true;
    let matchesFilterUpdateDate = true;

    if (selectSearchQuery === 'firstName' && searchQuery) {
      matchesSearchQuery = item.firstName.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectSearchQuery === 'email') {
      matchesSearchQuery = item.email.toLowerCase().includes(searchQuery.toLowerCase());
    } 

    if (filterUserType) {
      matchesFilterUserType = item.type.toString() === filterUserType;
    }

    if (filterCreationDate) {
      matchesFilterCreationDate = isSameDate(new Date(item.createdAt).toLocaleDateString(), filterCreationDate);
    }

    if (filterUpdateDate) {
      matchesFilterUpdateDate = isSameDate(new Date(item.updatedAt).toLocaleDateString(), filterUpdateDate);
    }

    return matchesSearchQuery && matchesFilterUserType && matchesFilterCreationDate && matchesFilterUpdateDate;
  });

  const cleanFilters = () => {
    setSearchQuery('')
    setSelectSearchQuery('');
    setFilterUserType('');
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
    if (selectSearchQuery === 'firstName') {
      return 'nome'
    } else if (selectSearchQuery === 'email') {
      return 'e-mail'
    } else {
      return null
    }
  }

  useEffect(() => {
    if (!usersState) {
      dispatch(fetchUsersList());  
    }
  }, [])

  useEffect(() => {
    if ( 
      filterUserType || 
      filterCreationDate || 
      filterUpdateDate || 
      sortConfig ||
      (selectSearchQuery && searchQuery)
    ) {
      setCurrentPage(1);
    }
  }, [selectSearchQuery, searchQuery, filterUserType, filterCreationDate, filterUpdateDate, sortConfig]);
  
  // O `useEffect` garante que o componente só renderize no cliente, evitando erros de "hydration-error" no Next.js.
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Layout pageTitle="Usuários">
      <div>
        <div className="flex justify-between mb-5">
          <Button
            className="bg-blue-500 " 
          >
            <Link href={'/dashboard/admin/users/create-user'}>Novo usuário</Link>
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
                <SelectItem value="firstName">Nome</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
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
                      <p>Tipo</p>
                      <Select 
                        onValueChange={(value) => setFilterUserType(value)}
                        value={filterUserType}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
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
                  className={`hover:text-blue-500 cursor-pointer select-none ${sortConfig.key === 'firstName' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('firstName')}
                >
                  <span className="flex">
                    Nome
                    {sortConfig.key === 'firstName' && sortConfig.direction === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
                  </span>
                </TableHead>
                <TableHead>Email</TableHead>
                <TableHead
                  className={`cursor-pointer hover:text-blue-500 select-none ${sortConfig.key === 'type' ? 'text-blue-500' : ''}`} 
                  onClick={() => handleSort('type')}
                >
                  <span className="flex">
                    Tipo
                    {sortConfig.key === 'type' && sortConfig.direction === 'asc' ? <ArrowUpAZ /> : <ArrowDownAZ />}
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
                <TableHead className="text-right">Editar</TableHead>
                <TableHead className="text-right">Deletar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell
                  >
                    {user.type === 'admin' ? (
                        <Badge className="bg-green-400 text-black gap-2"><Crown size={15} /> Administrador</Badge> 
                      ) : (
                        <Badge className="bg-yellow-400 text-black gap-2"><PencilLine size={15}/>Editor</Badge>
                      )
                    }
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    {user.posts?.length}
                    {user.posts?.length > 0 ? (
                      <Dialog >
                        <DialogTrigger className="flex justify-center items-center">
                          <NotebookText />
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl overflow-y-auto max-h-5/6">
                          <DialogHeader>
                            <DialogTitle className="mb-3">Posts do usário {user.firstName}</DialogTitle>
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
                                  {user.posts?.map((post) => (
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
                      null
                    )}
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link href={`/dashboard/admin/users/edit-user/${user.id}`}>
                      <button className="hover:bg-blue-500 p-2 rounded-full hover:text-white"><Pencil /></button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DeleteAlert onConfirm={(result) => handleDeleteUser(result, user.id)} id={user.id} />
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