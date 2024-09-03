'use client'

import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"
import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
import { authenticateUser } from "@/services/auth";
import { api } from "@/services/api";
import { User } from "@/types/User";

export default function DashboardAdmin() {
  const { user, signOut } = useContext(AuthContext)
  const [ users, setUsers ] = useState<User[]>([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get<{allUsers: User[] }>('/users');
        setUsers(response.data.allUsers);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }

    fetchUsers();
  }, []);
  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h1>Dashboard</h1>
          <p>Bem vindo Administrador: {user?.firstName} {user?.lastName}</p>
          <p>email: {user?.email}</p>
          <p>tipo: {user?.type}</p>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h2>Lista de Usuários</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.firstName} {user.lastName} - {user.email} ({user.type})
              </li>
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