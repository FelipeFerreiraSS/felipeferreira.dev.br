'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import HeaderMenu from "@/components/headerMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteUser, fetchUsersList } from "@/store/features/user/truckFunctions";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import DeleteAlert from "@/components/deleteAlert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Users() {
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

  useEffect(() => {
    if (!usersState) {
      dispatch(fetchUsersList());  
    }
  }, [])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <HeaderMenu />
      <div className="mx-auto w-full max-w-4xl mb-5">
        <div className="w-full flex justify-between">
          <h2>Lista de Usuários</h2>
          <Button
            className="bg-blue-500 " 
            >
              <Link href={'/dashboard/admin/users/create-user'}>Criar usuário</Link>
          </Button>
        </div>
        <table border={1} cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Posts</th>
              <th>Data de criação</th>
              <th>Data de atualização</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {usersState?.map((users) => (
              <tr key={users.id} className="border-black border-2 ">
                <td>{users.id}</td>
                <td>{users.firstName}</td>
                <td>{users.lastName}</td>
                <td>{users.email}</td>
                <td>{users.type}</td>
                <td>
                  {users.posts?.length}
                  {users.posts?.length > 0 ? (
                    <Dialog >
                      <DialogTrigger>
                        📄
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle className="mb-3">Posts do usário {users.firstName}</DialogTitle>
                          <DialogDescription className="flex flex-row items-center justify-center text-black">
                            <table border={1} cellPadding="10" cellSpacing="0">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Status</th>
                                  <th>Titulo</th>
                                  <th>Resumo</th>
                                  <th>Data de criação</th>
                                  <th>Data de atualização</th>
                                </tr>
                              </thead>
                              <tbody>
                                {users.posts?.map((post) => (
                                  <tr key={post.id} className="border-black border-2 ">
                                    <td>{post.id}</td>
                                    <td>{post.published ? 'Publicado' : 'Rascunho'}</td>
                                    <td>{post.title}</td>
                                    <td>{post.summary}</td>
                                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                                    
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ): (
                    null
                  )}
                </td>
                <td>{new Date(users.createdAt).toLocaleDateString()}</td>
                <td>{new Date(users.updatedAt).toLocaleDateString()}</td>
                <td><Link href={`/dashboard/admin/users/edit-user/${users.id}`}>✏️</Link></td>
                <td><DeleteAlert onConfirm={(result) => handleDeleteUser(result, users.id)} id={users.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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