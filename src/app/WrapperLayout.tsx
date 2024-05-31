"use client";

import Header from "@/components/layouts/MainLayout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/MainLayout/Footer";
import { UserType } from "@/types/user";
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
  auth,
  session,
}: {
  children: React.ReactNode;
  auth?: UserType;
  session: Session;
}) {
  const pathname = usePathname();
  return (
    <SessionProvider session={session}>
      {enableNavbar.includes(pathname) && <Header auth={auth} />}
      {children}
      {enableNavbar.includes(pathname) && <Footer />}
    </SessionProvider>
  );
}
