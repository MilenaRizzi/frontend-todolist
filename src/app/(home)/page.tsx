import Image from "next/image";
import Link from "next/link";
import { GrBeacon } from "react-icons/gr";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoCheckboxOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="pt-10">
      <main className="bg-[#FEFEFE] flex justify-center items-center w-[1200px] h-[450px] m-auto rounded-xl shadow-lg">
        <div className="flex flex-col justify-around w-[470px] h-[300px] text-[#333]">
          <h1 className="text-4xl font-bold">
            Bem-vindo ao <span className="text-[#4ea8de]">To Do List</span>
          </h1>
          <p className="text-[#656565] text-lg">
            Mantenha-se organizado e produtivo com nossa ferramenta simples e
            eficaz.
          </p>
          <div className="flex flex-col gap-3 text-sm mt-4">
            <p className="flex gap-3 items-center font-medium text-[#4a4a4a]">
              <HiMiniPencilSquare size={24} className="text-[#4ea8de]" />
              Crie, edite e organize suas tarefas com facilidade
            </p>
            <p className="flex gap-3 items-center font-medium text-[#4a4a4a]">
              <IoCheckboxOutline size={24} className="text-[#4ea8de]" />
              Acompanhe o status da suas atividades
            </p>
            <p className="flex gap-3 items-center font-medium text-[#4a4a4a]">
              <GrBeacon size={24} className="text-[#4ea8de]" />
              Acesse em qualquer dispositivo conectado à internet
            </p>
          </div>
          <div className="space-x-4 mt-6">
            <Link
              href={"/sign-in"}
              className="bg-gradient-to-r from-[#4A7B9F] to-[#4ea8de] hover:from-[#3b83a9] hover:to-[#68aeda] text-white px-6 py-2 rounded shadow-lg transition-all duration-300 ease-in-out"
            >
              Entre
            </Link>
            <Link
              href={"/sign-up"}
              className="bg-gradient-to-r from-[#4A7B9F] to-[#4ea8de] hover:from-[#3b83a9] hover:to-[#68aeda] text-white px-6 py-2 rounded shadow-lg transition-all duration-300 ease-in-out"
            >
              Registre-se
            </Link>
          </div>
        </div>
        <div className="ml-10">
          <Image
            src={"/to-do.jpg"}
            alt={"Imagem de tarefas"}
            width={450}
            height={450}
            quality={100}
          />
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="py-4 text-center mt-auto">
        <p className="text-xs text-gray-600">
          © 2024 To Do List. Todos os direitos reservados.
        </p>
      </footer> */}
    </div>
  );
}
