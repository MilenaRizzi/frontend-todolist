import Image from "next/image";
import ModalMenu from "./menu-navigation";
import Link from "next/link";

interface HeaderProps {
  currentPage: "auth" | "dashboard" | "home";
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="relative h-[70px] flex items-center p-14">
      <div className="absolute inset-0 flex items-center justify-center">
        <Link href={"/"}>
          <Image src="/Logo.svg" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      {currentPage === "dashboard" && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center">
          <ModalMenu />
        </div>
      )}

      {currentPage === "home" && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center"></div>
      )}
    </header>
  );
}
