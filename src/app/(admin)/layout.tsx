"use client";

import Aside from "@/components/layouts/User/Aside";
import { usePathname } from "next/navigation";
import { createContext, useState } from "react";

const enableNavbar = ["/dashboard"];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [isSidebar, setSidebar] = useState<boolean>(true);

  return (
    <>
      <main
        className={`${
          isSidebar ? "md:left-[250px] md:w-[calc(100%-250px)]" : ""
        } left-[60px] w-[calc(100%-60px)] relative bg-three min-h-screen h-fit`}
      >
        {children}
      </main>
      {enableNavbar.includes(pathname) && (
        <Aside isSidebar={isSidebar} setSidebar={setSidebar} />
      )}
    </>
  );
}
