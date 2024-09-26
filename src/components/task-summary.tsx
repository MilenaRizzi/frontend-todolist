import React from "react";

interface TaskSummaryProps {
  totalTasks: number;
  completedTasksCount: number;
}

export function TaskSummary({
  totalTasks,
  completedTasksCount,
}: TaskSummaryProps) {
  return (
    <div className="flex justify-between mb-6">
      <div className="flex items-center gap-2">
        <p className="text-gray-600 font-bold text-xs">Tarefas criadas</p>
        <span className="text-gray-300 bg-gray-500 rounded-full px-2 py-1 text-xs">
          {totalTasks}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-gray-600 font-bold text-xs">Concluídas</p>
        <span className="text-gray-300 bg-gray-500 rounded-full px-2 py-1 text-xs">
          {completedTasksCount} de {totalTasks}
        </span>
      </div>
    </div>
  );
}
