'use client'

import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect } from "react"
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
import { authenticateUser } from "@/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchPostsList } from "@/store/features/post/truckFunctions";

export default function DashboardAdmin() {
  const { signOut } = useContext(AuthContext)
  const dispatch: AppDispatch = useDispatch()

  const userState = useSelector((state: RootState) => state.user);
  const postsState = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    if (!postsState.posts) {
      dispatch(fetchPostsList());  
    }
  }, [])
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
        <h1>Dashboard</h1>
        <p>Bem vindo Administrador: {userState.user?.firstName} {userState.user?.lastName}</p>
        <p>email: {userState.user?.email}</p>
        <p>tipo: {userState.user?.type}</p>
      </div>
      <div className="mx-auto w-full max-w-4xl mb-5">
        <h2>Lista de Posts</h2>
        <table border={1} cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Autor</th>
              <th>Capa</th>
              <th>Titulo</th>
              <th>Resumo</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {postsState.posts?.map((post) => (
              <tr key={post.id} className="border-black border-2 ">
                <td>{post.id}</td>
                <td>{post.author.firstName}</td>
                <td>{post.headerImage?.imageUrl}</td>
                <td>{post.title}</td>
                <td>{post.summary}</td>
                <td className="w-36">
                  {post.tags.map((tag) => (
                    <div key={tag.id}>
                      <li>{tag.name}</li>
                    </div>
                  ))}
                </td>  
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