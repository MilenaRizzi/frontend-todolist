import Header from "@/components/header";
import { TaskProvider } from "@/contexts/task-context";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
      <TaskProvider>
        <div className="">
          <Header currentPage="dashboard" />
          {children}
        </div>
      </TaskProvider>
  );
}
