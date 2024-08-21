import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex justify-center py-20">
      <form
        action=""
        className="flex flex-col justify-evenly w-[430px] h-[340px] px-10 rounded bg-[#333333] relative z-10"
      >
        <h1 className="text-[#2791CF]  text-2xl">Entre</h1>
        <div className="flex flex-col gap-6 w-[350px]">
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-white placeholder-white w-full"
            type="text"
            placeholder="Digite seu email"
          />
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-white placeholder-white w-full"
            type="password"
            placeholder="Digite sua senha"
          />
        </div>
        <button className="bg-[#1E6F9F] p-2 text-sm text-gray-100 rounded hover:bg-[#4a7b9f]">
          Entrar
        </button>
        <div className="text-gray-300 text-xs flex justify-center gap-2">
          <p>Ainda não é cadastrado?</p>
          <Link href="/sign-up" className="text-[#2791CF] hover:text-[#2FB0FA]">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}
