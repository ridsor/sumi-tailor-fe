"use client";

import Header from "@/components/layouts/MainLayout/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/layouts/MainLayout/Footer";
import { SessionProvider } from "next-auth/react";
import { UserType } from "@/types/user";
import BottomNavbar from "@/components/layouts/MainLayout/BottomNavbar/BottomNavbar";
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
  return (
    <SessionProvider>
      {enableNavbar.includes(pathname) && <Header auth={auth} />}
      {children}
      {enableNavbar.includes(pathname) && <Footer />}
      <BottomNavbar/>
    </SessionProvider>
  );
}
