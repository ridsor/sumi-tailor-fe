"use client";

import { TbLayoutDashboard } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import sumi_tailor from "@/assets/img/icons/sumi-tailor-v2.png";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import user_img from "@/assets/img/user-img.svg";
import { fetchAuth, logout } from "@/services/auth";
import { UserType } from "@/types/user";
import { signOut } from "next-auth/react";

interface Props {
  isSidebar: boolean;
  setSidebar: (value: boolean) => void;
  user: UserType;
}

export default function Aside({ isSidebar, setSidebar, user }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoadingLogout, setLoadingLogout] = useState<boolean>(false);

  const handleLogout = useCallback(async () => {
    setLoadingLogout(true);

    await signOut({
      redirect: false,
    });

    try {
      const response = await logout();

      if (response?.status != "success") {
        console.error("Failed to logout");

        setLoadingLogout(false);
        return;
      }
    } catch (e) {
      console.log(e);
    }

    router.push("/");
    setLoadingLogout(false);
  }, [router]);

  return (
    <aside
      className={`${
        isSidebar ? "right-0" : ""
      } fixed top-0 bottom-0 left-0 md:right-auto z-40`}>
      <div className="relative w-full h-full">
        {isSidebar ? (
          <div
            className="absolute w-full h-full bg-[rgba(0,0,0,0.2)] md:hidden"
            onClick={() => setSidebar(false)}></div>
        ) : (
          ""
        )}
        <div
          className={`${
            isSidebar ? " w-[250px]" : "w-fit"
          } h-screen min-h-fit relative z-50`}>
          <div
            className={`${
              isSidebar ? "right-3 top-3" : "-right-5 top-11"
            } absolute bg-three z-10 rounded-full p-1 flex items-center justify-center`}>
            <button
              className="rounded-full bg-two text-three active:ring active:ring-[rgba(0,0,0,.1)] text-lg p-2"
              onClick={() => setSidebar(!isSidebar)}
              aria-label="Menu Sidebar">
              <FaPlay
                className={`${isSidebar ? "-rotate-180" : ""} transition`}
              />
            </button>
          </div>
          <article
            className={`bg-[#E4EEDD] w-full h-full grid px-2 py-4 overflow-auto rounded-tr-2xl rounded-br-2xl`}>
            <div>
              <div className="brand flex items-center mb-3">
                <div>
                  <Image
                    src={sumi_tailor}
                    alt="logo"
                    className="w-[44px] aspect-square"
                    priority
                    width={60}
                    height={60}
                  />
                </div>
                {isSidebar ? (
                  <span className="font-semibold text-base font-one">
                    Sumi Tailor
                  </span>
                ) : (
                  ""
                )}
              </div>
              <hr className="border-top border-[#d7d3cc] mb-3" />
              <div className={`${isSidebar ? "px-2" : ""} user-profile mb-2`}>
                <div
                  className={`${
                    isSidebar ? "w-[70px]" : "w-[44px]"
                  } user-img aspect-square mx-auto mb-1`}>
                  <Image
                    src={
                      user?.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}/images/${user?.image}`
                        : user_img
                    }
                    width={70}
                    height={70}
                    alt="user_img"
                    className="w-full h-full object-cover object-center rounded-full shadow-sm border-2 border-[#d7d3cc]"
                    priority
                  />
                </div>
                {isSidebar ? (
                  <>
                    <div className="user-name text-center font-semibold">
                      {user?.name}
                    </div>
                  </>
                ) : (
                  ""
                )}
                <Link
                  href="/profile"
                  className={`${
                    pathname === "/profile" ? "bg-four" : ""
                  } flex items-center hover:bg-four rounded-md w-full font-semibold active:ring active:ring-three mt-2`}>
                  <div className="p-3">
                    <FaUser className="text-xl" />
                  </div>
                  {isSidebar ? "Profil" : ""}
                </Link>
              </div>
              <hr className="border-top border-[#d7d3cc]" />
              <ul
                className={`${
                  isSidebar ? "p-2" : "py-2"
                } flex flex-col font-semibold gap-y-1`}>
                <li>
                  <Link
                    href="/dashboard"
                    className={`${
                      pathname === "/dashboard" ? "bg-four" : ""
                    } flex items-center hover:bg-four rounded-md active:ring active:ring-three`}>
                    <div className="p-3">
                      <TbLayoutDashboard className="text-xl" />
                    </div>
                    {isSidebar ? "Dashboard" : ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className={`${
                      pathname === "/orders" || pathname === "/orders/history"
                        ? "bg-four"
                        : ""
                    } flex items-center hover:bg-four rounded-md active:ring active:ring-three`}>
                    <div className="p-3">
                      <FaShoppingCart className="text-xl" />
                    </div>
                    {isSidebar ? "Pesanan" : ""}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/accounts"
                    className={`${
                      pathname === "/accounts" ? "bg-four" : ""
                    } flex items-center hover:bg-four rounded-md active:ring active:ring-three`}>
                    <div className="p-3">
                      <RiShieldUserFill className="text-xl" />
                    </div>
                    {isSidebar ? "Akun" : ""}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="self-end">
              <hr className="border-top border-[#d7d3cc] mb-2" />
              <button
                className="flex items-center hover:bg-four rounded-md w-full font-semibold active:ring active:ring-three p-3 gap-x-3"
                onClick={handleLogout}
                disabled={isLoadingLogout}>
                <FaArrowRightFromBracket className="text-xl" />
                {isSidebar ? (isLoadingLogout ? "Loading..." : "Logout") : ""}
              </button>
            </div>
          </article>
        </div>
      </div>
    </aside>
  );
}
