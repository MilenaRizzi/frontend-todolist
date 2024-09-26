"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";

export default function ModalMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    router.push("/sign-in");
  };

  return (
    <div className="relative pr-[20px]">
      <button
        className="bg-blue-500 hover:bg-blue-400 text-sm text-white p-2 rounded-full shadow-lg focus:outline-none"
        onClick={toggleMenu}
      >
        <IoMenu size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48">
          <button
            className="text-gray-600 hover:text-gray-800 absolute top-2 right-2"
            onClick={toggleMenu}
          ></button>
          <ul className="p-4 space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block p-2 rounded hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Tarefas
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="block p-2 rounded hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Perfil
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block p-2 rounded hover:bg-gray-100 w-full flex"
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
