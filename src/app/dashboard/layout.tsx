"use client";
import Navbar from "@/components/base/Navbar";
import { useUserStore } from "@/store/user";
import { LoaderCircle } from "lucide-react";
import { useLayoutEffect, useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, getUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    getUser();
    if (user) {
      setLoading(false);
    }
  }, [user, getUser]);

  if (loading) {
    return (
      <section className="h-dvh flex flex-col items-center justify-center">
        <LoaderCircle className="animate-spin size-8" />
      </section>
    );
  }
  return (
    <section className="h-dvh">
      <Navbar />
      {children}
    </section>
  );
}
