import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`h-dvh`}>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
