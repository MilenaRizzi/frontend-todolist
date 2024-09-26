"use client";

import React, { ReactNode, createContext, useState, useEffect } from "react";
import { getTasks } from "@/service/task-service";

interface TaskData {
  id?: number;
  description: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: TaskData[];
  setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getTasks(token)
      .then(setTasks)
      .catch((error) => console.error("Erro ao carregar tarefas:", error));
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
