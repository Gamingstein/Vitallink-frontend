import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Caveat, Bevan } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import { ApolloWrapper } from "@/components/wrappers/ApolloWrapper";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import localFont from "next/font/local";

const bevan = Bevan({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bevan",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const author = localFont({
  src: "./fonts/author-variable.woff2",
  variable: "--font-author",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "VitalLink",
  description: "VitalLink is a platform for monitoring patients health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.className} dark scroll-smooth antialiased`}
    >
      <body
        className={`${poppins.variable} ${author.variable} ${caveat.variable} ${bevan.variable}`}
      >
        <SonnerToaster />
        <main>
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
