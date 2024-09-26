import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ConfirmationModalProps {
  title: string | null;
  description: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  onClose: () => void;
}

export default function ConfirmationModal({
  title,
  description,
  isLoading,
  isSuccess,
  error,
  onClose,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="flex flex-col justify-around bg-white p-6 rounded-lg shadow-lg h-[350px] w-[370px] text-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-t-4 border-t-[#2791CF] border-gray-300 border-solid rounded-full animate-spin"></div>
            <p className="mt-4 text-[#2791CF]">Carregando...</p>
          </div>
        ) : isSuccess ? (
          <>
            <div className="flex justify-center pt-5">
              <Image src="/sucesso.png" alt={""} width={100} height={100} />
            </div>
            <h2 className="text-2xl text-[#2791CF] mb-4">
              {title}
            </h2>
            <p className="text-sm text-gray-700">
              {description}
            </p>
            <Link
              href={"/"}
              className="mt-4 bg-[#1E6F9F] text-white py-2 px-4 rounded hover:bg-[#4a7b9f]"
            >
              Fechar
            </Link>
          </>
        ) : (
          <div>
            <h2 className="text-2xl text-red-500 mb-4">Erro no cadastro</h2>
            <p className="text-sm ">{error}</p>
            <div className="mt-5">
              <button
                onClick={onClose}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
