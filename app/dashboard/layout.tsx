// app/dashboard/layout.tsx (or server component)
// This is where we handle the session check on the server
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/lib/authOptions";
import React from "react";

export default async function DashboardLayout({
                                                children,
                                              }: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== 'ADMIN') {
    redirect('/');
  }

  return <>{children}</>;
}
