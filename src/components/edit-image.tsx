"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { GiSaveArrow } from "react-icons/gi";

interface IFormInput {
  file: FileList;
}

interface EditImageProps {
  setImage: (imageUrl: string) => void;
  setIsImageEditing: (value: boolean) => void;
}

export function EditImage({ setImage, setIsImageEditing }: EditImageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const postImage = async (image: File) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8080/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Após o upload, atualize a imagem no componente pai
      const imageUrl = URL.createObjectURL(image); // Gera uma URL local para a nova imagem
      setImage(imageUrl); // Atualiza o estado da imagem no componente pai
      setIsImageEditing(false); 
    } catch (error) {
      console.error("Erro ao fazer o upload da imagem", error);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const file = data.file[0];
    if (file) {
      setSelectedFile(file);
      await postImage(file);
    } else {
      console.error("Nenhuma imagem selecionada");
    }
  };

  return (
    <div>
      <form
        className="flex items-center justify-center px-10 rounded gap-2 w-[430px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="file"
          className="h-[35px] p-2 text-sm rounded-[8px] outline-none bg-[#E8F0FE] text-gray-700 placeholder-gray-500 w-full"
          accept="image/*"
          {...register("file", {
            onChange: (e) => setSelectedFile(e.target.files?.[0] || null),
          })}
        />
        {errors.file && <p className="text-red-500">{errors.file.message}</p>}
        {selectedFile && (
          <button
            title="salvar imagem"
            type="submit"
            className="text-black bg-gray p-2 rounded hover:bg-gray-100"
          >
            <GiSaveArrow size={22} />
          </button>
        )}
      </form>
    </div>
  );
}
