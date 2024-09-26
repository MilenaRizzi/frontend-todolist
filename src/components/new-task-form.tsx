"use client";

import React, { useContext } from "react";
import { PlusCircle } from "phosphor-react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskContext } from "@/contexts/task-context";
import { postTask } from "@/service/task-service";

export interface TaskData {
  id?: number;
  description: string;
  completed: boolean;
}

const newTaskFormValidationSchema = zod.object({
  description: zod.string().min(1, "Informe a tarefa"),
  completed: zod.boolean().default(false),
});

type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>;

export default function NewTaskForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      description: "",
      completed: false,
    },
  });
  const { setTasks } = useContext(TaskContext) || { setTasks: () => {} };

  const description = watch("description");
  const isSubmitDisabled = !description;

  const submit = async (data: NewTaskFormData) => {
    const token = localStorage.getItem("token");
    const newTask = await postTask(data, token);
    setTasks((prevTasks) => [...prevTasks, newTask]); 
    reset();
  };

  return (
    <div className="flex flex-row justify-center">
      <form onSubmit={handleSubmit(submit)} className="flex w-[736px]">
        <input
          type="text"
          id="task"
          placeholder="Adicione uma nova tarefa"
          {...register("description")}
          className="w-[638px] h-[54px] rounded outline-none bg-white text-gray-600 p-4 mr-2 placeholder-gray-300"
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`flex items-center justify-center w-[90px] h-[52px] rounded font-bold text-sm text-gray-100  ${
            isSubmitDisabled
              ? "bg-[#5e60ce] opacity-70 cursor-not-allowed"
              : "bg-[#5e60ce] hover:bg-blue-700"
          }`}
        >
          Criar
          <PlusCircle size={18} color="#ffffff" className="ml-2" />
        </button>
      </form>
    </div>
  );
}
