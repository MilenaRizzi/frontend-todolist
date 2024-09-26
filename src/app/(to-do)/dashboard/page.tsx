import NewTaskForm from "@/components/new-task-form";
import Tasks from "@/components/tasks";

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center pt-10">
        <NewTaskForm />
        <Tasks />
      </div>
    </div>
  );
}
