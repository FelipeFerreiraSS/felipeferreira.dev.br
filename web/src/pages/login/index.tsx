'use client'

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorMessage from "@/components/formErrorMessage";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().min(1 ,'O email é obrigatório'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const { toast } = useToast()

  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  async function handleSignIn(data: LoginSchema) {
    setIsSubmitting(true);
    try {
      await signIn(data);
    } finally {
      setIsSubmitting(false); 
    }
  }

  const userState = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userState.user) {
        if (userState.user?.type === 'admin') {
          router.replace('/dashboard/admin');
        } else if (userState.user?.type === 'editor') {
          router.replace('/dashboard/editor');
        }
      } else {
        router.push('/login');
      }
  }, [userState, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');

    if (error) {
      toast({
        variant: "destructive",
        title: 
          error === 'invalid_token'
            ? 'Sessão inválida'
            : error === 'expired_token'
            ? 'Sessão expirada'
            : 'Erro na autenticação',
        description: 
          error === 'invalid_token'
            ? 'O token de autenticação fornecido é inválido. Por favor, faça login novamente.'
            : error === 'expired_token'
            ? 'Sua sessão expirou devido à inatividade. Faça login para continuar.'
            : 'Ocorreu um problema ao validar seu token de autenticação. Tente novamente.',
        duration: 5000,
      });
    }
  }, [toast]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-800 dark:text-gray-200">
            Faça login na sua conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-500 hover:text-blue-400">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>
              
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
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      Login <RefreshCw size={18} className="animate-spin"/>
                    </span>
                  ) : (
                    'Login'
                  )
                }
              </Button>
            </div>
          </form>

          {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
  );
}
