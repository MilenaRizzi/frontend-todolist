import Header from "@/components/header";
import { ReactNode } from "react";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
      <div className="">
        <Header currentPage="home" />
        {children}
      </div>
  );
}
