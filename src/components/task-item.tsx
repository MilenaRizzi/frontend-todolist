import React from "react";
import { EditTaskButton } from "./edit-task-button";
import { DeleteTaskButton } from "./delete-task-button";
import { TaskCheckbox } from "./checkbox-task";

interface TaskItemProps {
  task: { id?: number; description: string; completed: boolean };
}

export function TaskItem({ task }: TaskItemProps) {
   if (task.id === undefined) {
     return null;
   }
  return (
    <div className="h-[72px] flex justify-between items-center bg-white text-gray-600 p-3 rounded mb-3">
      <div className="flex items-center gap-3">
        <TaskCheckbox
          id={task.id}
          completed={task.completed}
          label={task.description}
        />
      </div>
      <div className="flex items-center gap-2">
        <EditTaskButton taskId={task.id} taskDescription={task.description} />
        <DeleteTaskButton taskId={task.id} />
      </div>
    </div>
  );
}
