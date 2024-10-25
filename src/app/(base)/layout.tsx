"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/user";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUserStore((state) => state?.user);
  return (
    <section className="h-dvh">
      <Navbar user={user} />
      {children}
      <Footer />
    </section>
  );
}
