"use client";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/user";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, getUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, [loading, getUser]);

  if (loading) {
    return (
      <section className="h-dvh flex flex-col items-center justify-center">
        <LoaderCircle className="animate-spin size-8" />
      </section>
    );
  }

  return (
    <section className="h-dvh">
      <Navbar user={user} />
      {children}
    </section>
  );
}
