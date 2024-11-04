"use client";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/user";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUserStore((state) => state?.user);
  return (
    <section className="h-dvh">
      <Navbar user={user} />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </section>
  );
}
