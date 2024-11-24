'use client'

import { GetServerSideProps } from "next";
import { authenticateUser } from "@/services/auth";
import HeaderMenu from "@/components/headerMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchUsersList, getUserById, updateUser } from "@/store/features/user/truckFunctions";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SubmitButton from "@/components/submitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorMessage from "@/components/formErrorMessage";
import Layout from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UploaderProfileImages from "@/components/user/uploaderProfileImages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const editUserSchema = z.object({
  firstName: z.string().min(1 ,'O nome é obrigatório'),
  lastName: z.string().min(1, 'O sobrenome é obrigatório'),
  email: z.string().email('Formato de e-mail inválido').min(1, 'O e-mail é obrigatório'),
  type: z.string().min(1, 'O tipo é obrigatório'),
  password: z.string().optional().refine((val) => !val || val.length >= 8, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  }),
});

export type UserData = {
  firstName: string,
  lastName: string,
  email: string,
  type: string,
  profileImageUrl?: string
}

export type EditUserSchema = z.infer<typeof editUserSchema>

export default function EditUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userIdState = useSelector((state: RootState) => state.user.userId);
  const userState = useSelector((state: RootState) => state.user.user);
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema)
  })

  const router = useRouter();
  
  //const [isLoading, setIsLoading] = useState(true);
  const { id } = router.query;

  const numericId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const { toast } = useToast()
  const dispatch: AppDispatch = useDispatch()

  const formValues = watch();

  async function handleUpdateUser(data: EditUserSchema) {
    setIsLoading(true)
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
    setIsLoading(false)
  }

  const handleSuccess = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (numericId) {
      const fetchUserData = async() => {
        dispatch(getUserById(numericId));
        if (userIdState) {
          setValue('firstName', userIdState.firstName);
          setValue('lastName', userIdState.lastName);
          setValue('email', userIdState.email);
          setValue('type', userIdState.type);
        }
        //setIsLoading(false);
      }
      fetchUserData();
    }
  }, [id, setValue, dispatch]);

  useEffect(() => {
    const hasChanged = 
      formValues.firstName !== userIdState?.firstName ||
      formValues.lastName !== userIdState?.lastName ||
      formValues.email !== userIdState?.email ||
      formValues.type !== userIdState?.type ||
      formValues.password !== "";
  
    setIsFormChanged(hasChanged);
  }, [formValues, userIdState]);

  return (
    <Layout pageTitle="Editar usuário">
      <div>
        <Button
          className="bg-blue-500 mb-5"
          onClick={() => router.back()} 
        >
          Voltar
        </Button>
        <Card>
          <CardContent>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-10">
              <div>
                {userIdState?.profileImageUrl ? (
                  <Avatar className="w-32 h-32">
                    <AvatarImage className="object-cover" src={userIdState.profileImageUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <CircleUserRound size={100} /> 
                )}
              </div>
              <div className="flex gap-5 mt-5">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant={"default"}
                      onClick={() => setIsDialogOpen(true)}
                    >
                      {userIdState?.profileImageUrl ? 'Altera imagem':'Adicionar imagem'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="mb-3">Atualizar foto de perfil</DialogTitle>
                      <DialogDescription>
                        <UploaderProfileImages 
                          profileImageUrl={userIdState?.profileImageUrl ? userIdState?.profileImageUrl : null} 
                          userId={numericId} 
                          updateMyProfileImage={false}
                          onSuccess={handleSuccess}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            </div>
            <form className="space-y-6 max-w-lg" onSubmit={handleSubmit(handleUpdateUser)}>
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
                  Atualizar perfil
                </SubmitButton>
              </div>
            </form>
          </CardContent>
        </Card>
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