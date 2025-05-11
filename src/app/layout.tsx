import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Caveat, Bevan, Geist } from "next/font/google";
import { ApolloWrapper } from "@/components/wrappers/ApolloWrapper";
import { Toaster } from "@/components/ui/sonner";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      className={`scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.className} ${poppins.variable} ${author.variable} ${caveat.variable} ${bevan.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <ApolloWrapper>{children}</ApolloWrapper>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
