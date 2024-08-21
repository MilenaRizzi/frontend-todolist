"use client";

import { PlusCircle } from "phosphor-react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useTaskDataMutate } from "../../../../components/hooks/useTaskDataMutate";

export interface TaskData {
  id?: number;
  description?: string;
  completed?: boolean;
}

const newTaskFormValidationSchema = zod.object({
  description: zod.string().min(1, "Informe a tarefa"),
});

type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>;

export default function NewTaskForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      description: "",
    },
  });

  // const { mutate } = useTaskDataMutate();
  const description = watch("description");
  const isSubmitDisabled = !description;

  const submit = () => {
    const taskData: TaskData = {
      description: description,
      completed: false,
    };
    // mutate(taskData);
    reset();
  };

  return (
    <div className="flex flex-row	 justify-center ">
      <form onSubmit={handleSubmit(submit)} className="flex w-[736px]">
        <input
          type="text"
          id="task"
          placeholder="Adicione uma nova tarefa"
          {...register("description")}
          className="w-[638px] h-[54px] rounded-lg outline-none bg-[#333333] text-gray-100 p-4 mr-2 placeholder-gray-300"
        />
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`flex items-center justify-center w-[90px] h-[52px] rounded-lg font-bold text-sm text-gray-100 ${
            isSubmitDisabled
              ? "bg-blue-500 opacity-70 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          Criar
          <PlusCircle size={18} color="#ffffff" className="ml-2" />
        </button>
      </form>
    </div>
  );
}
