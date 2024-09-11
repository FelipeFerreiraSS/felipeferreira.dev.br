'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import HeaderMenu from "@/components/headerMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import { User } from "@/types/User";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchUsersList, getUserById, updateUser } from "@/store/features/user/truckFunctions";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/router";
import { useEffect } from "react";

export interface EditUserType extends User {
  password?: string
}

export default function EditUser() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditUserType>()
  const router = useRouter();
  
  //const [isLoading, setIsLoading] = useState(true);
  const { id } = router.query;

  const numericId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  async function handleUpdateUser(data: EditUserType) {
    const isSuccess = await dispatch(updateUser(numericId, data ))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso.",
      });
      dispatch(fetchUsersList()); 
      router.push("/dashboard/admin/users")
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha atualizar o usário.",
      });
    }
  }

  useEffect(() => {
    if (numericId) {
      const fetchUserData = async() => {
        const userData = await dispatch(getUserById(numericId));
        if (userData) {
          setValue('firstName', userData.firstName);
          setValue('lastName', userData.lastName);
          setValue('email', userData.email);
          setValue('type', userData.type);
        }
        //setIsLoading(false);
      }
      fetchUserData();
    }
  }, [id, setValue, dispatch]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <HeaderMenu />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
        <div className="flex justify-between">
          <h1>Editar usuário</h1>
          <Button
            className="bg-blue-500 "
            onClick={() => router.back()} 
          >
            Voltar
          </Button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(handleUpdateUser)}>
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input 
              {...register('firstName')}
              type="text" 
              id="firstName" 
              placeholder="Nome" 
              autoComplete="name" 
              name="firstName"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input 
              {...register('lastName')}
              type="text" 
              id="lastName" 
              placeholder="Sobrenome" 
              autoComplete="family-name" 
              name="lastName"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              {...register('email')}
              type="email" 
              id="email" 
              placeholder="Email" 
              autoComplete="email" 
              name="email"
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo do usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input 
              {...register('password')}
              type="password" 
              id="password" 
              placeholder="Senha" 
              autoComplete="current-password" 
              name="password"
            />
          </div>
          <div>
            <Button
            type="submit"
            className="bg-blue-500 " 
            >
              Cadastrar
            </Button>
          </div>
        </form>
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