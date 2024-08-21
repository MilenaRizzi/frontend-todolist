import Header from "@/components/header";
import SignIn from "@/components/sign-in";
import NewTaskForm from "@/components/new-task-form";
import { Tasks } from "@/components/tasks";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
