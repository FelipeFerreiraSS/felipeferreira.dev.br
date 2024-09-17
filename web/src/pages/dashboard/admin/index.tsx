'use client'

import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect } from "react"
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
import { authenticateUser } from "@/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deletePost, fetchPostsList } from "@/store/features/post/truckFunctions";
import { Inter } from "next/font/google";
import HeaderMenu from "@/components/headerMenu";
import Image from "next/image";
import Link from "next/link";
import DeleteAlert from "@/components/deleteAlert";
import { useToast } from "@/hooks/use-toast";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardAdmin() {
  const { signOut } = useContext(AuthContext)
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

  useEffect(() => {
    if (!postsState.posts) {
      dispatch(fetchPostsList());  
    }
  }, [])
  return (
    <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${inter.className}`}>
      <HeaderMenu />
      <div className="mx-auto w-full max-w-6xl mb-5">
        <div className="w-full flex justify-between">
          <h2>Lista de Posts</h2>
          <Button
            className="bg-blue-500 " 
            >
              <Link href={'/dashboard/admin/post/create-post'}>Criar post</Link>
          </Button>
        </div>
        <table border={1} cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Capa</th>
              <th>Titulo</th>
              <th>Resumo</th>
              <th>Tags</th>
              <th>Autor</th>
              <th>Data de criação</th>
              <th>Data de atualização</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {postsState.posts?.map((post) => (
              <tr key={post.id} className="border-black border-2 ">
                <td>{post.id}</td>
                <td>{post.published ? 'Publicado' : 'Rascunho'}</td>
                <td>
                  <Image
                    src={post.headerImage?.imageUrl ?? '/default-image.png'}
                    width={200}
                    height={250}
                    alt="Picture of the author"
                  />
                </td>
                <td>{post.title}</td>
                <td>{post.summary}</td>
                <td className="w-36">
                  {post.tags.map((tag) => (
                    <div key={tag.id}>
                      <li>{tag.name}</li>
                    </div>
                  ))}
                </td>  
                <td>{post.author.firstName}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td><Link href={`/dashboard/admin/post/edit-post/${post.id}`}>✏️</Link></td>
                <td><DeleteAlert onConfirm={(result) => handleDeletePost(result, post.id)} id={post.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Button onClick={() => signOut()}>
          Sair
        </Button>
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