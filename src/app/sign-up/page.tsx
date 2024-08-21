export default function SingUp() {
  return (
    <div className="flex justify-center py-20">
      <form
        action=""
        className="flex flex-col justify-evenly w-[430px] h-[360px] px-10 rounded bg-[#333333] relative z-10"
      >
        <h1 className="text-[#2791CF] text-2xl">Cadastre-se!</h1>
        <div className="flex flex-col gap-6 w-[350px]">
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-[#E3E3E3] placeholder-[#E3E3E3] w-full"
            type="text"
            placeholder="Digite seu nome"
          />
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-[#E3E3E3] placeholder-[#E3E3E3] w-full"
            type="text"
            placeholder="Digite seu email"
          />
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-[#E3E3E3] placeholder-[#E3E3E3] w-full"
            type="password"
            placeholder="Digite sua senha"
          />
        </div>
        <button className="bg-[#1E6F9F] p-2 text-sm text-gray-100 rounded hover:bg-[#4a7b9f]">
          Entrar
        </button>
      </form>
    </div>
  );
}
