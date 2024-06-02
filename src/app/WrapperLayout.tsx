"use client";

import Header from "@/components/layouts/MainLayout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/MainLayout/Footer";
import { SessionProvider, signOut } from "next-auth/react";
import { UserType } from "@/types/user";
import { useEffect } from "react";
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
}: {
  children: React.ReactNode;
  auth?: UserType;
}) {
  const pathname = usePathname();
  // useEffect(() => {
  //   if (!auth) {
  //     signOut({ redirect: true, callbackUrl: "/" });
  //   }
  // }, []);
  return (
    <SessionProvider>
      {enableNavbar.includes(pathname) && <Header auth={auth} />}
      {children}
      {enableNavbar.includes(pathname) && <Footer />}
    </SessionProvider>
  );
}
