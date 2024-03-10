"use client";

import Aside from "@/components/layouts/UserLayout/Aside";
import { usePathname } from "next/navigation";
import { useState } from "react";

const enableNavbar = ["/dashboard", "/profile", "/accounts", "/orders"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isSidebar, setSidebar] = useState<boolean>(true);

  return enableNavbar.includes(pathname) ? (
    <>
      <main
        className={`${
          isSidebar ? "md:left-[250px] md:w-[calc(100%-250px)]" : ""
        } left-[60px] w-[calc(100%-60px)] relative bg-three min-h-screen h-fit`}>
        {children}
      </main>
      {enableNavbar.includes(pathname) && (
        <Aside isSidebar={isSidebar} setSidebar={setSidebar} />
      )}
    </>
  ) : (
    children
  );
}
