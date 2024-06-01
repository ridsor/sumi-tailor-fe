"use client";

import Header from "@/components/layouts/MainLayout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/MainLayout/Footer";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
// import ReduxProvider from "@/components/fragments/ReduxProvider";

const enableNavbar = [
  "/",
  "/about",
  "/gallery",
  "/service",
  "/login",
  "/order-list",
];

export default function WrapperLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();
  return (
    <SessionProvider>
      {enableNavbar.includes(pathname) && <Header session={session} />}
      {children}
      {enableNavbar.includes(pathname) && <Footer />}
    </SessionProvider>
  );
}
