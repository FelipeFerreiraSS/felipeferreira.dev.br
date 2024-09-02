'use client'

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

type Login = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>()
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: Login) {
    await signIn(data)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
            </div>

            <div>
              <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Login
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
