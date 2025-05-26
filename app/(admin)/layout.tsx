import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
