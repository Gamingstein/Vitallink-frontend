"use client";
import Navbar from "@/components/base/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-dvh">
      <Navbar />
      {children}
    </section>
  );
}
