"use client";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUp } from "@/service/auth-service";
import { useState } from "react";
import ConfirmationModal from "@/components/confirmation-modal";
import { validateEmail } from "@/app/api/validateEmail/emailValidation";

const signUpSchema = zod.object({
  name: zod.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: zod.string().email("Digite um email válido"),
  password: zod.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignUpFormData = zod.infer<typeof signUpSchema>;

const getErrorMessage = (error: any) => {
  if (error.message === "E-mail inválido ou não verificável.") {
    return "E-mail inválido ou não verificável.";
  } else if (error.response?.status === 409) {
    return "Email já está cadastrado.";
  } else {
    return "Ocorreu um erro ao tentar realizar o cadastro.";
  }
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [modalState, setModalState] = useState({
    show: false,
    isLoading: false,
    isSuccess: false,
    error: null as string | null,
  });
  const { show, isLoading, isSuccess, error } = modalState;
  const registeredEmail = localStorage.getItem("email") || "";
  
const onSubmit: (data: SignUpFormData) => Promise<void> = async (data) => {
  setModalState({
    show: true,
    isLoading: true,
    isSuccess: false,
    error: null,
  });
  try {
    const isEmailValid = await validateEmail(data.email);
    if (!isEmailValid) {
      throw new Error("E-mail inválido ou não verificável.");
    }
    localStorage.setItem("email", data.email);
    await signUp(data);
    setModalState({
      show: true,
      isLoading: false,
      isSuccess: true,
      error: null,
    });
    reset();
  } catch (err: any) {
    console.error("Erro no cadastro:", err);
    setModalState({
      show: true,
      isLoading: false,
      isSuccess: false,
      error: getErrorMessage(err),
    });
  }
};

  return (
    <div className="flex justify-center py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-evenly w-[430px] h-[360px] px-10 rounded bg-white bg-opacity-90 relative z-10"
      >
        <h1 className="text-[#2791CF] text-2xl">Cadastre-se!</h1>
        <div className="flex flex-col gap-3 w-[350px]">
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] placeholder-gray-500 w-full"
            type="text"
            placeholder="Digite seu nome"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 px-1.5 text-xs p-0">
              {errors.name.message}
            </p>
          )}
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] placeholder-gray-500 w-full"
            type="text"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 px-1.5 text-xs">
              {errors.email.message}
            </p>
          )}
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] placeholder-gray-500 w-full"
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 px-1.5 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#1E6F9F] hover:bg-[#4a7b9f] p-2 text-sm text-gray-100 rounded "
        >
          Cadastrar
        </button>
        <div className="text-black text-xs flex justify-center gap-2">
          <p>Já tem uma conta?</p>
          <Link href="/sign-in" className="text-[#2791CF] hover:text-[#2FB0FA]">
            Fazer login
          </Link>
        </div>
      </form>
      {show && (
        <ConfirmationModal
          title={"Seu registro foi processado!"}
          description={`Um email de confirmação foi enviado para ${registeredEmail}`}
          isLoading={isLoading}
          isSuccess={isSuccess}
          error={error}
          onClose={() => setModalState((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}
