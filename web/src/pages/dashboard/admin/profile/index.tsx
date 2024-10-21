'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchUserInfo, updateUser } from "@/store/features/user/truckFunctions";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubmitButton from "@/components/submitButton";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormErrorMessage from "@/components/formErrorMessage";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Layout from "@/components/layout";

const profileSchema = z.object({
  firstName: z.string().min(1 ,'O nome é obrigatório'),
  lastName: z.string().min(1, 'O sobrenome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido').min(1, 'O e-mail é obrigatório'),
  type: z.string().min(1, 'O tipo é obrigatório'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export type ProfileSchema = z.infer<typeof profileSchema>

export default function Profile() {
  const userState = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  })
  const router = useRouter();

  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  async function handleUpdateUser(data: ProfileSchema) {
    setIsLoading(true)

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
    setIsLoading(false)
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
    <Layout pageTitle="Perfil">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <h1>Perfil</h1>
          <div>
            {userState?.profileImageUrl ? (
              <Image
                src={userState.profileImageUrl}
                width={300}
                height={300}
                alt="Picture of the author"
                className="rounded-full"
                style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "100%" }}
                priority
              />
            ) : (
              <CircleUserRound size={200} /> 
            )}
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
              <FormErrorMessage error={errors.firstName?.message}/>
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
              <FormErrorMessage error={errors.lastName?.message}/>
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
              <FormErrorMessage error={errors.email?.message}/>
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
              <FormErrorMessage error={errors.type?.message}/>
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
              <FormErrorMessage error={errors.password?.message}/>
            </div>
            <div>
              <SubmitButton isLoading={isLoading}>
                Atualizar perfil
              </SubmitButton>
            </div>
          </form>
        </div>
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