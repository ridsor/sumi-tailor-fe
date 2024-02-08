"use client";

import "./globals.css";
import Header from "@/components/layouts/MainLayout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/MainLayout/Footer";
import { josenfin_sans, quicksand } from "@/fonts";

const enableNavbar = [
  "/",
  "/about",
  "/gallery",
  "/service",
  "/login",
  "/orders",
];

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
        suppressHydrationWarning={true}>
        {enableNavbar.includes(pathname) && <Header pathname={pathname} />}
        {children}
        {enableNavbar.includes(pathname) && <Footer />}
      </body>
    </html>
  );
}
