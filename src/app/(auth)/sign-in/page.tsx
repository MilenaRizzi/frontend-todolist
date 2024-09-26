"use client";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "@/service/auth-service";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

const signInSchema = zod.object({
  email: zod.string().email("Digite um email válido"),
  password: zod.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignInFormData = zod.infer<typeof signInSchema>;

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signIn(data);
      localStorage.setItem("token", result.token);

      const decoded: any = jwtDecode(result.token);
      const userEmail = decoded.sub;

      if (userEmail) {
        localStorage.setItem("email", userEmail);
      }

      reset();
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error.response);
      if (error.response && error.response.status === 403) {
        setErrorMessage("Email ou senha inválidos");
      } else if (error.response && error.response.status === 404) {
        setErrorMessage("Usuário não cadastrado");
        console.log(error.response);
      } else {
        setErrorMessage("Erro no login");
      }
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-evenly w-[430px] h-[340px] px-10 rounded bg-white bg-opacity-90 relative z-10"
      >
        <h1 className="text-[#2791CF] text-2xl">Entre</h1>
        <div className="flex flex-col gap-6 w-[350px]">
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] placeholder-gray-500 w-full"
            type="text"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <input
            className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] placeholder-gray-500 w-full"
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="bg-[#1E6F9F] hover:bg-[#4a7b9f] p-2 text-sm text-gray-100 rounded "
        >
          Entrar
        </button>
        <div className="text-black text-xs flex justify-center gap-2">
          <p>Ainda não é cadastrado?</p>
          <Link href="/sign-up" className="text-[#2791CF] hover:text-[#2FB0FA]">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}
