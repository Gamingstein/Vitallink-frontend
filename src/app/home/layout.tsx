import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = {
    name: "",
    email: "",
    avatar: "",
    isAdmin: false,
    username: "",
  };
  return (
    <section className={`h-dvh`}>
      <Navbar user={user} />
      {children}
      <Footer />
    </section>
  );
}
