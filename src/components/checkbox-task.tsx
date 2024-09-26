import React, { useState, useContext } from "react";
import { TaskContext } from "@/contexts/task-context";

interface TaskCheckboxProps {
  id: number;
  completed: boolean;
  label: string;
}

export function TaskCheckbox({ id, completed, label }: TaskCheckboxProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { setTasks } = useContext(TaskContext) || { setTasks: () => {} };

  const handleToggle = async () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/tasks/checked/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: newCompletedStatus }),
        }
      );

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completed: newCompletedStatus } : task
          )
        );
      } else {
        console.error("Erro ao atualizar a tarefa:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
        className="w-4 h-4 accent-[#A855D3]"
        id={`taskCheckbox-${id}`}
      />
      <label
        htmlFor={`taskCheckbox-${id}`}
        className={`text-sm cursor-pointer ${
          isCompleted ? "line-through text-gray-400" : ""
        }`}
      >
        {label}
      </label>
    </>
  );
}
