'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import HeaderMenu from "@/components/headerMenu";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchUserInfo, updateUser } from "@/store/features/user/truckFunctions";
import { Controller, useForm } from "react-hook-form";
import { EditUserType } from "../users/edit-user/[id]";
import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Profile() {
  const userState = useSelector((state: RootState) => state.user.user);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EditUserType>()
  const router = useRouter();

  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  async function handleUpdateUser(data: EditUserType) {
    
    const isSuccess = await dispatch(updateUser(userState?.id, data ))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Usuário atualizado com sucesso.",
      });
      dispatch(fetchUserInfo()); 
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha atualizar o usário.",
      });
    }
  }

  useEffect(() => {
    if (userState) {
      setValue('firstName', userState.firstName);
      setValue('lastName', userState.lastName);
      setValue('email', userState.email);
      setValue('type', userState.type);
    }
  }, [userState, setValue]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <HeaderMenu />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
        <h1>Perfil</h1>
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
              Atualizar perfil
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