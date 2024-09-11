'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import HeaderMenu from "@/components/headerMenu";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Profile() {
  const userState = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <HeaderMenu />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
        <h1>Perfil</h1>
        <p>Nome: {userState?.firstName}</p>
        <p>Sobrenome: {userState?.lastName}</p>
        <p>email: {userState?.email}</p>
        <p>tipo: {userState?.type}</p>
        <div className="flex gap-5">
          <Button
          type="submit"
          className="bg-blue-500 " 
          >
            Editar perfil
          </Button>
          <Button
          type="submit"
          className="bg-blue-500 " 
          >
            Editar senha
          </Button>
        </div>
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