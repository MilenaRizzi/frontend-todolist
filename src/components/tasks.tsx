"use client";

import { CheckCircle, Circle, PencilLine, Trash } from "phosphor-react";
import { useState } from "react";
import { Modal } from "./modal";

export function Tasks() {
  // Dados estáticos para teste
  const initialData = [
    { id: 1, description: "Finalizar o projeto de React", completed: false },
    {
      id: 2,
      description: "Estudar para o exame de matemática",
      completed: true,
    },
  ];

  const [tasks, setTasks] = useState(initialData);
  const [editingTask, setEditingTask] = useState({ id: 0, description: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (taskId: number, description: string) => {
    setEditingTask({ id: taskId, description });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalTasksCount = tasks.length;

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleUpdateTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, description: editingTask.description }
          : task
      )
    );
    setIsModalOpen(false);
  };

  return (
    <div className="w-[736px] py-12 ">
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2 ">
          <p className="text-blue-500 font-bold text-xs">Tarefas criadas</p>
          <span className="text-gray-300 bg-gray-500 rounded-full px-2 py-1 text-xs">
            {totalTasksCount}
          </span>
        </div>
        <div className="flex items-center gap-2 ">
          <p className="text-purple-500 font-bold text-xs">Concluídas</p>
          <span className="text-gray-300 bg-gray-500 rounded-full px-2 py-1 text-xs">
            {tasks.filter((task) => task.completed).length} de {totalTasksCount}
          </span>
        </div>
      </div>
      <div>
        {tasks
          .sort((a, b) => a.id - b.id)
          .map((taskData) => (
            <div
              key={taskData.id}
              className="h-[72px] flex justify-between items-center bg-[#333333] text-gray-200 p-3 rounded-lg mb-3"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleCompleteTask(taskData.id)}
              >
                {taskData.completed ? (
                  <CheckCircle
                    size={24}
                    className="text-purple-500"
                    weight="fill"
                  />
                ) : (
                  <Circle size={24} className="text-blue-500" />
                )}
                <p
                  className={`text-sm ${taskData.completed ? "line-through text-gray-400" : ""
                    }`}
                >
                  {taskData.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleOpenModal(taskData.id, taskData.description)
                  }
                >
                  <PencilLine
                    size={18}
                    className="text-gray-300 hover:text-purple-500"
                  />
                </button>
                <button onClick={() => handleDeleteTask(taskData.id)}>
                  <Trash
                    size={18}
                    className="text-gray-300 hover:text-red-500"
                  />
                </button>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="flex flex-col justify-around h-[250px] py-4">
            <h1 className="text-[#2791CF] text-2xl text-center">
              Atualize sua tarefa
            </h1>
            <input
              type="text"
              value={editingTask.description}
              onChange={(e) =>
                setEditingTask({ ...editingTask, description: e.target.value })
              }
              className=" h-[50px] p-2 text-sm rounded-[8px] outline-none bg-[rgba(255,255,255,0.2)] text-[#E3E3E3] placeholder-[#E3E3E3]"
            />
            <div className="flex justify-center gap-2 pt-4">
              <button
                onClick={() => handleUpdateTask(editingTask.id)}
                className="bg-[#1E6F9F] px-6 py-2 text-sm text-gray-100 rounded hover:bg-[#4a7b9f]"
              >
                Salvar
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-600 px-6 py-2 text-sm text-gray-100 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )
      }
    </div >
  );
}
