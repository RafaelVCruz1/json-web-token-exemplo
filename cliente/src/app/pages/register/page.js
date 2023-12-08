'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postUser } from "@/app/functions/handlerAcessAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {

   const [user, setUser] = useState({

    usuario: '',
    senha: '',
    confirmesenha: '',
  
   });

   const { push, refresh } = useRouter();

   const userRegister = async (e) => {
    e.preventDefault();
    try {

        if (user.usuario == "" || user.senha == "" || user.senha !== user.confirmesenha) {
            toast.error("Preencha todos os campos corretamente");
            return;
        } 
        else {
            console.log("teste")
            await postUser(user)
            toast.success("Cadastrado com sucesso!")
            setTimeout(() => {
              push('/pages/dashboard')
            }, 1500)
          
        }
    } 
        catch {
          toast.error("Error!");
          refresh();
        }
  };

   return (
    <div className="bg-custom-5 p-8 md:p-16 min-h-screen flex flex-col justify-center">
  <div className="max-w-md mx-auto bg-custom-4 p-8 rounded-lg shadow-lg">
    <h1 className="text-3xl text-custom-1 mb-8">Cadastro</h1>
    <form onSubmit={userRegister} className="space-y-4">
      <div>
        <input
          className="w-full px-4 py-2 rounded-lg border border-custom-3 focus:border-custom-1 focus:ring-2 focus:ring-custom-1"
          placeholder="Nome"
          type="text"
          onChange={(e) => { setUser({ ...user, usuario: e.target.value }) }}
        />
      </div>
    
      <div>
        <input
          className="w-full px-4 py-2 rounded-lg border border-custom-3 focus:border-custom-1 focus:ring-2 focus:ring-custom-1"
          placeholder="Senha"
          type="password"
          onChange={(e) => { setUser({ ...user, senha: e.target.value }) }}
        />
      </div>
      <div>
        <input
          className="w-full px-4 py-2 rounded-lg border border-custom-3 focus:border-custom-1 focus:ring-2 focus:ring-custom-1"
          placeholder="Confirme a Senha"
          type="password"
          onChange={(e) => { setUser({ ...user, confirmesenha: e.target.value }) }}
        />
      </div>
      <div className="text-center">
        <button
          className="bg-custom-2 text-custom-3 hover:bg-custom-3 hover:text-custom-1 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-1"
          type="submit"
        >
          Cadastrar
        </button>
      </div>
    </form>
    <ToastContainer />
  </div>
</div>

);
    

};