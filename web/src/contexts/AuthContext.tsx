'use client'

import { useToast } from '@/hooks/use-toast';
import { createContext, ReactNode, useEffect } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Login } from '@/types/Login';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { clearUser, setUser } from '@/store/features/user/userSlice';
import { fetchUserInfo } from '@/store/features/user/truckFunctions';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthenticatedType = {
  isAuthenticated: boolean
  signIn: (data: Login) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthenticatedType)

export function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast()
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const userState = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!userState

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
        dispatch(setUser(response.data.user));

        if (response.data.user.type === 'admin') {
          router.replace('/dashboard/admin');
        } else if (response.data.user.type === 'editor') {
          router.replace('/dashboard/editor');
        } else {
          router.replace('/login');
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
      clearUser();
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
      dispatch(fetchUserInfo());  
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}