"use client";

import "./globals.css";
import Header from "@/components/layouts/MainLayout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/MainLayout/Footer";
import { josenfin_sans, quicksand } from "@/fonts";
import ReduxProvider from "@/components/fragments/ReduxProvider";
import { SessionProvider } from "next-auth/react";

const enableNavbar = ["/", "/about", "/gallery", "/service", "/login"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <ReduxProvider>
      <SessionProvider>
        <html lang="en">
          <body
            suppressHydrationWarning={true}
            className={`${quicksand.variable} ${josenfin_sans.variable}`}>
            {enableNavbar.includes(pathname) && <Header />}
            {children}
            {enableNavbar.includes(pathname) && <Footer />}
          </body>
        </html>
      </SessionProvider>
    </ReduxProvider>
  );
}
