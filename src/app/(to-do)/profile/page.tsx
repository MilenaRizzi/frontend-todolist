"use client";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  deleteUser,
  getUserByEmailService,
  updateUserService,
} from "@/service/auth-service";
import Link from "next/link";
import { ArrowLeft } from "phosphor-react";
import api from "@/lib/axiosConfig";
import { EditImage } from "@/components/edit-image";
import ConfirmationModal from "@/components/confirmation-modal";

export interface UserData {
  id?: string;
  name: string;
  email: string;
  password?: string;
  imageName?: string;
  profileImageName?: string;
}

const editProfileSchema = zod.object({
  id: zod.string(),
  name: zod.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: zod.string().email("Digite um email válido"),
  password: zod.string().optional(),
});

type EditProfileFormData = zod.infer<typeof editProfileSchema>;

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [modalState, setModalState] = useState({
    show: false,
    isLoading: false,
    isSuccess: false,
    error: null as string | null,
  });
  const { show, isLoading, isSuccess, error } = modalState;

  //Carrega o token e email do usuário do localStorage quando o componente é montado.
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const emailFromStorage = localStorage.getItem("email");

    setToken(tokenFromStorage);
    setUserEmail(emailFromStorage);
  }, []);

  //Chama a função fetchUser para buscar os dados do usuário quando o email e o token estão disponíveis.
  useEffect(() => {
    if (userEmail && token) {
      fetchUser(userEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    let objectUrl: string | null = null; // Inicializa como null

    const fetchProfileImage = async () => {
      if (user?.profileImageName && token) {
        try {
          const response = await api.get(`/image/${user.profileImageName}`, {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          objectUrl = URL.createObjectURL(response.data);
          setProfileImage(objectUrl);
        } catch (error) {
          console.error("Erro ao carregar a imagem", error);
        }
      }
    };

    fetchProfileImage();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [user?.profileImageName, token]);

  const onSubmit = async (data: EditProfileFormData) => {
    if (token) {
      try {
        const updatedUser = await updateUserService(data, token);
        setUser(updatedUser);
        reset(updatedUser);
        setIsEditing(false);
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        alert("Erro ao atualizar perfil");
      }
    } else {
      alert("Token não encontrado");
    }
  };

  const fetchUser = async (email: string) => {
    if (token) {
      try {
        const userData = await getUserByEmailService(email, token);
        setUser(userData);
        reset(userData);
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
      }
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const startPasswordEditing = () => {
    setIsPasswordEditing(true);
  };

  const startImageEditing = () => {
    setIsImageEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsPasswordEditing(false);
    setIsImageEditing(false);
    reset(user || undefined);
  };

  const handleDeleteUser = async () => {
    setModalState({
      show: true,
      isLoading: true,
      isSuccess: false,
      error: null,
    });
    if (user?.id === undefined) {
      return;
    }
    try {
      await deleteUser(user.id, token || "");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      setModalState({
        show: true,
        isLoading: false,
        isSuccess: true,
        error: null,
      });
    } catch (err) {
      setModalState({
        show: true,
        isLoading: false,
        isSuccess: false,
        error: null,
      });
      console.error("Erro ao deletar usuário", err);
    }
  };

  return (
    <div className="flex justify-center py-8">
      <div className="flex flex-col items-center gap-[10px] pt-8 w-[440px] h-[450px] rounded bg-white bg-opacity-90 relative">
        {!isEditing && (
          <div className="absolute top-4 left-4">
            <Link href="/dashboard">
              <ArrowLeft size={24} className="text-black hover:text-blue-500" />
            </Link>
          </div>
        )}
        <div className="flex justify-center items-center">
          <Image
            src={profileImage || "/default-profile.png"}
            alt="Imagem do perfil"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        {!isImageEditing && isEditing && (
          <div className="flex justify-center">
            <button
              type="button"
              className="text-[#2791CF] hover:text-[#2FB0FA] text-xs"
              onClick={startImageEditing}
            >
              Alterar Imagem
            </button>
          </div>
        )}
        {isImageEditing && (
          <EditImage
            setImage={setProfileImage}
            setIsImageEditing={setIsImageEditing}
          />
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-evenly h-[200px]"
        >
          <div className="flex flex-col gap-4 w-[350px]">
            <input
              type="text"
              placeholder="Digite seu nome"
              className={`h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] text-gray-700 placeholder-gray-500 w-full ${
                !isEditing ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              {...register("name")}
              disabled={!isEditing}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <input
              type="email"
              placeholder="Digite seu email"
              className={`h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] text-gray-700 placeholder-gray-500 w-full ${
                !isEditing ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              {...register("email")}
              disabled={!isEditing}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            {isPasswordEditing && (
              <input
                type="password"
                placeholder="Digite sua nova senha"
                className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] text-gray-700 placeholder-gray-500 w-full"
                {...register("password")}
              />
            )}
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {!isPasswordEditing && isEditing && (
              <div className="flex gap-8 justify-between">
                <button
                  type="button"
                  className="text-[#2791CF] hover:text-[#2FB0FA] text-xs"
                  onClick={startPasswordEditing}
                >
                  Alterar Senha
                </button>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-400 text-xs"
                  onClick={handleDeleteUser}
                >
                  Excluir conta
                </button>
              </div>
            )}
          </div>
          <div className="text-center">
            {!isEditing ? (
              <div className="pt-10">
                <button
                  type="button"
                  className="text-white px-4 py-2 rounded bg-[#1E6F9F] hover:bg-[#4a7b9f]"
                  onClick={startEditing}
                >
                  Editar perfil
                </button>
              </div>
            ) : (
              <div className="pt-4 flex justify-center gap-8 mt-2">
                <div></div>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-400 text-white text-sm px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Voltar
                </button>
              </div>
            )}
          </div>
        </form>
        {show && (
          // eslint-disable-next-line react/jsx-no-undef
          <ConfirmationModal
            title={"Concluido!"}
            description={`Usuário excluido com sucesso`}
            isLoading={isLoading}
            isSuccess={isSuccess}
            error={error}
            onClose={() => setModalState((prev) => ({ ...prev, show: false }))}
          />
        )}
      </div>
    </div>
  );
}
