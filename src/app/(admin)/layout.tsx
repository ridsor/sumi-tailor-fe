"use client";

import Aside from "@/components/layouts/User/Aside";
import { usePathname } from "next/navigation";
import { createContext, useState } from "react";

<<<<<<< HEAD
const enableNavbar = ["/dashboard"];
=======

const enableNavbar = ["/dashboard", "/profile", "/account"];
>>>>>>> f64b3452b8b4bb8030e1bd6d454a9eff2ee6accb

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
