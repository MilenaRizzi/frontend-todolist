"use client";

import React, { useContext } from "react";
import { TaskItem } from "./task-item";
import { TaskContext } from "@/contexts/task-context";
import { TaskSummary } from "./task-summary";

interface TaskData {
  id?: number;
  description: string;
  completed: boolean;
}

export default function Tasks() {
  const context = useContext(TaskContext);
  const { tasks } = context || { tasks: [], setTasks: () => {} };

  const filteredTasks = tasks.filter(
    (task): task is TaskData => task.id !== undefined
  );

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="w-[736px] py-12">
      <TaskSummary
        totalTasks={filteredTasks.length}
        completedTasksCount={completedTasksCount}
      />
      <div>
        {filteredTasks
          .sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
          .map((task) => (
            <TaskItem key={task.id!} task={task} />
          ))}
      </div>
    </div>
  );
}
