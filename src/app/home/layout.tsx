import Footer from "@/components/base/Footer";
import Navbar from "@/components/base/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`min-h-dvh`}>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
