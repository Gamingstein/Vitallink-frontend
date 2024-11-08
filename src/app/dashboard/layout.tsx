"use client";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/user";
import { useLayoutEffect } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, getUser } = useUserStore();

  useLayoutEffect(() => {
    getUser();
  });

  return (
    <section className="h-dvh">
      <Navbar user={user} />
      {children}
    </section>
  );
}
