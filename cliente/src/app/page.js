'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user)
      if (userAuth.token === undefined) {
        toast.error("E-mail ou senha invalidos")
      }
        push("/pages/dashboard");
    } catch {
      toast.error("Error")
      refresh();
    }
  }
  return (
    <div className="bg-custom-5 p-8 md:p-16 min-h-screen flex flex-col justify-center">
  <div className="max-w-md mx-auto bg-custom-4 p-8 rounded-lg shadow-lg">
    <h1 className="text-3xl text-custom-1 mb-8">Login</h1>
    <form onSubmit={handlerLogin} className="space-y-4">
      <div>
        <input
          className="w-full px-4 py-2 rounded-lg border border-custom-3 focus:border-custom-1 focus:ring-2 focus:ring-custom-1"
          placeholder="E-mail"
          type="email"
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
        />
      </div>
      <div>
        <input
          className="w-full px-4 py-2 rounded-lg border border-custom-3 focus:border-custom-1 focus:ring-2 focus:ring-custom-1"
          placeholder="Senha"
          type="password"
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
        />
      </div>
      <div className="text-center">
        <button
          className="bg-custom-2 text-custom-3 hover:bg-custom-3 hover:text-custom-1 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-1"
          type="submit"
        >
          Entrar
        </button>
      </div>
    </form>
    <ToastContainer />
  </div>
</div>

  )
}
