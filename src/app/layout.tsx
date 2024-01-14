"use client";

import "./globals.css";
import Header from "@/components/layouts/Main/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/Main/Footer";
import { josenfin_sans, quicksand } from "@/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${josenfin_sans.variable}`}
        suppressHydrationWarning={true}
      >
        <Header pathname={pathname} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
