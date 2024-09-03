'use client'

import { useToast } from '@/hooks/use-toast';
import { createContext, ReactNode, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { User } from '@/types/User';
import { Login } from '@/types/Login';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthenticatedType = {
  isAuthenticated: boolean
  signIn: (data: Login) => Promise<void>;
  user: User | null
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthenticatedType)

export function AuthProvider({ children }: AuthProviderProps) {
  const [ user, setUser ] = useState<User | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const isAuthenticated = !!user

  async function signIn(data: Login) {
    try {
      const response = await api.post('/login', data);
      if (response.status === 200) {
        toast({
          title: "Sucesso",
          description: "Login bem-sucedido.",
        });

        setCookie(undefined, 'felipeferreirablog.token', response.data.token, {
          maxAge: 60 * 60 * 1, // 1 hour
          path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

        setUser(response.data.user)

        if (response.data.user.type === 'admin') {
          router.push('/dashboard/admin');
        } else if (response.data.user.type === 'editor') {
          router.push('/dashboard/editor');
        } else {
          router.push('/login');
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao fazer login. Verifique suas credenciais e tente novamente.",
      });
    }
  }

  async function signOut() {
    try {
      setUser(null);
      destroyCookie(undefined, 'felipeferreirablog.token', {
        path: '/'
      });
      api.defaults.headers['Authorization'] = '';
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao fazer logout. Tente novamente.",
      });
    }
  }

  useEffect(() => {
    const { 'felipeferreirablog.token': token } = parseCookies()

    if (token) {
      api.get(`/user-info`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Erro ao obter dados do usuário:', error);
        // Opcional: limpar o token se ocorrer um erro
        // destroyCookie(undefined, 'felipeferreirablog.token');
      });
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}