'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import HeaderMenu from "@/components/headerMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createUser, fetchUsersList } from "@/store/features/user/truckFunctions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import SubmitButton from "@/components/submitButton";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorMessage from "@/components/formErrorMessage";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";

const createUserSchema = z.object({
  firstName: z.string().min(1 ,'O nome é obrigatório'),
  lastName: z.string().min(1, 'O sobrenome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido').min(1, 'O e-mail é obrigatório'),
  type: z.string().min(1, 'O tipo é obrigatório'),
  password: z.string().optional().refine((val) => !val || val.length >= 8, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema)
  })

  const router = useRouter();
  
  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  async function handleCreateUser(data: CreateUserSchema) {
    setIsLoading(true)
    const isSuccess = await dispatch(createUser(data))
    
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Usuário criado com sucesso.",
      });
      dispatch(fetchUsersList());  
      router.push("/dashboard/admin/users")
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao deletar usário.",
      });
    }
    setIsLoading(false)
  }

  return (
    <Layout pageTitle="Criar usuário">
      <div>
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-10">
                <div>
                  <Label htmlFor="image">Foto de perfil</Label>
                  {/* {userState?.profileImageUrl ? (
                    <Image
                      src={userState.profileImageUrl}
                      width={100}
                      height={100}
                      alt="Picture of the author"
                      className="rounded-full"
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "100%" }}
                      priority
                    />
                  ) : (
                    <CircleUserRound size={200} /> 
                  )} */}
                  <CircleUserRound size={100} /> 
                </div>
                <div className="flex gap-5 mt-5">
                  <Button variant={"default"}>Altera imagem</Button>
                  <Button variant={"destructive"}>Deletar imagem</Button>
                </div>
              </div>
              <Button
                className="bg-blue-500 "
                onClick={() => router.back()} 
              >
                Voltar
              </Button>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(handleCreateUser)}>
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
                  autoComplete="new-password" 
                  name="password"
                />
                <FormErrorMessage error={errors.password?.message}/>
              </div>
              <div>
                <SubmitButton isLoading={isLoading}>
                  Cadastrar
                </SubmitButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
          <div className="flex justify-between">
            <h1>Cadastrar novo usuário</h1>
            <Button
              className="bg-blue-500 "
              onClick={() => router.back()} 
            >
              Voltar
            </Button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(handleCreateUser)}>
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
                autoComplete="new-password" 
                name="password"
              />
              <FormErrorMessage error={errors.password?.message}/>
            </div>
            <div>
              <SubmitButton isLoading={isLoading} disabled={!isFormChanged}>
                Cadastrar
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>  */}
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