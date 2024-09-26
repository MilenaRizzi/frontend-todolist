"use client";

import React, { useState } from "react";
import { PencilLine } from "phosphor-react";
import { EditTaskModal } from "./edit-task-modal";

interface EditButtonModalProps {
  taskId: number;
  taskDescription: string;
}

export function EditTaskButton({
  taskId,
  taskDescription,
}: EditButtonModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(taskDescription);

  const handleEditTask = () => {
    setEditingTask(taskDescription);
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleEditTask}>
        <PencilLine size={18} className="text-gray-500 hover:text-purple-500" />
      </button>
      {isModalOpen && (
        <EditTaskModal
          taskId={taskId}
          description={editingTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
