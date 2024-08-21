import Link from "next/link";

export default function Profile() {
  return (
    <div className="flex justify-center py-20">
      <form
        action=""
        className="flex flex-col justify-evenly w-[430px] h-[360px] px-10 rounded bg-[#333333] relative z-10"
      >
        <div className="flex content-center items-center justify-between">
          <h1 className="text-[#2791CF] text-2xl">Olá 🙋‍♀️</h1>
          <Link href={"/dashboard"} className="text-[#E3E3E3] text-xs">
            voltar
          </Link>
        </div>
        <div className="flex flex-col gap-6 w-[350px]">
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-[#E3E3E3] placeholder-[#E3E3E3] w-full"
            type="text"
            placeholder="Milena Clara Rizzi"
            disabled
          />
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-[#E3E3E3] placeholder-[#E3E3E3] w-full"
            type="text"
            placeholder="milenaclararizzi@gmail.com"
            disabled
          />
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-[#E3E3E3] placeholder-[#E3E3E3] w-full"
            type="password"
            placeholder="******"
            disabled
          />
        </div>
        <div className="flex justify-center gap-2 ">
          <button className="bg-[#1E6F9F] w-[110px] p-2 text-sm text-gray-100 rounded hover:bg-[#4a7b9f]">
            Editar Perfil
          </button>
          <button className="bg-[#1E6F9F] w-[110px] p-2 text-sm text-gray-100 rounded hover:bg-[#4a7b9f]">
            Excluir conta
          </button>
        </div>
      </form>
    </div>
  );
}
