import Header from "@/components/header";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="p-20">{children}</div>;
}
