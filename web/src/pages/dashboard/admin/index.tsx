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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h1>Dashboard</h1>
          <p>Bem vindo Administrador: {userState.user?.firstName} {userState.user?.lastName}</p>
          <p>email: {userState.user?.email}</p>
          <p>tipo: {userState.user?.type}</p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h2>Lista de Posts</h2>
          <ul>
            {postsState.posts?.map((post) => (
              <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5" key={post.id}>
                <p>{post.author.firstName}</p>
                <p>{post.title}</p>
                <p>{post.summary}</p>
                <p>{post.headerImage?.imageUrl}</p>
                {post.tags.map((tag) => (
                  <div key={tag.id}>
                    <li>{tag.name}</li>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Button onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      </div>
    </>
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