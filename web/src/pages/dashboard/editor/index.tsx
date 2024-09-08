'use client'

import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
import { authenticateUser } from "@/services/auth";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function DashboardEditor() {
  const { signOut } = useContext(AuthContext)
  const userState = useSelector((state: RootState) => state.user);
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h1>Dashboard</h1>
          <p>Bem vindo Editor: {userState.user?.firstName} {userState.user?.lastName}</p>
          <p>email: {userState.user?.email}</p>
          <p>tipo: {userState.user?.type}</p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h2>Lista de Usuários</h2>
          <ul>
            {/* {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName} - {user.email} ({user.type})
              </li>
            ))} */}
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
  
  if (userType !== 'editor') {
    return {
      redirect: {
        destination: '/dashboard/admin', // Redireciona para o admin se não for editor
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