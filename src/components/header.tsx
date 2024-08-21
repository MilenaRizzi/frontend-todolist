import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="h-[100px] bg-black flex justify-between items-center p-8">
      <div className="flex-grow flex justify-center pl-40">
        <Image src={"/Logo.svg"} alt={""} width={150} height={150} />
      </div>
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="font-extrabold text-[#2791CF] hover:text-[#2FB0FA]"
        >
          Tarefas
        </Link>
        <Link
          href="/profile"
          className="font-extrabold text-[#2791CF] hover:text-[#2FB0FA]"
        >
          Perfil
        </Link>
        <Link
          href="/"
          className="font-extrabold text-[#2791CF] hover:text-[#2FB0FA]"
        >
          logout
        </Link>
      </div>
    </header>
  );
}
