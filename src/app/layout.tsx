"use client";

import "./globals.css";
import Header from "@/components/layouts/MainLayout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/MainLayout/Footer";
import { josenfin_sans, quicksand } from "@/fonts";
import ReduxProvider from "@/components/fragments/ReduxProvider";

const enableNavbar = [
  "/",
  "/about",
  "/gallery",
  "/service",
  "/login",
  "/order-list",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className={`${quicksand.variable} ${josenfin_sans.variable}`}>
          {enableNavbar.includes(pathname) && <Header />}
          {children}
          {enableNavbar.includes(pathname) && <Footer />}
        </body>
      </html>
    </ReduxProvider>
  );
}
