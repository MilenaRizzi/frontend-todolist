"use client";

import React, { useState, useContext } from "react";
import { Trash } from "phosphor-react";
import { TaskContext } from "@/contexts/task-context";
import { deleteTask } from "@/service/task-service";

interface DeleteButtonProps {
  taskId?: number;
}

export function DeleteTaskButton({ taskId }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { setTasks } = useContext(TaskContext) || { setTasks: () => {} };

  const handleDeleteTask = async () => {
    setIsLoading(true);
    if (taskId === undefined) {
      return null; 
    }
    try {
      const token = localStorage.getItem("token");
      await deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
    setIsLoading(false);
  };

  return (
    <button onClick={handleDeleteTask} disabled={isLoading}>
      <Trash size={18} className="text-red-400 hover:text-red-500" />
    </button>
  );
}
