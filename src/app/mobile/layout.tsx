export default function MobileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="h-dvh">{children}</section>;
}
