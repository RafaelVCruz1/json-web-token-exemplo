import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";

export default async function Dashboard() {

   let lista = await getUsers();
   return (
    <div className="bg-custom-5 p-8 md:p-16 min-h-screen">
  <div className="max-w-4xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <Suspense fallback={<p>Carregando...</p>}>
      {lista.map((user, index) => (
        <div key={index} className="bg-custom-4 p-4 rounded-lg shadow-lg mb-4">
          <h1 className="text-custom-1 text-lg text-center">{user.name}</h1>
          <h1 className="text-custom-1 text-lg text-center">{user.email}</h1>
        </div>
      ))}
    </Suspense>
  </div>
</div>

);
    

};