import React, { useState, useContext } from "react";
import { TaskContext } from "@/contexts/task-context";
import { updateTask } from "@/service/task-service";

interface EditTaskModalProps {
  taskId: number;
  description: string;
  onClose: () => void;
}

export function EditTaskModal({
  taskId,
  description,
  onClose,
}: EditTaskModalProps) {
  const { setTasks } = useContext(TaskContext) || { setTasks: () => {} };
  const [newDescription, setNewDescription] = useState(description);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const task = {
      id: taskId,
      description: newDescription,
      completed: false,
    };
    const updatedTask = await updateTask(task, token);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={onClose}
      ></div>

      <div className="relative z-10 flex flex-col justify-around h-[250px] py-4 bg-white rounded shadow-lg w-[450px] p-6">
        <h1 className="text-[#2791CF] text-2xl text-center">
          Atualize sua tarefa
        </h1>

        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="h-[50px] p-2 text-sm rounded outline-none bg-[#E8F0FE] text-gray-600 placeholder-[#E3E3E3]"
        />

        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={handleSave}
            className="bg-[#1E6F9F] px-6 py-2 text-sm text-gray-100 rounded hover:bg-[#4a7b9f]"
          >
            Salvar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 px-6 py-2 text-sm text-gray-100 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
