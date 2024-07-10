"use client";

import { UserType } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = ({ auth }: { auth?: UserType }) => {
  const pathname = usePathname();

  return (
    <>
      <header className='absolute top-2 lg:top-0 left-0 right-0 z-40'>
        <div className='container px-5 lg:px-2 py-4'>
          <article className='lg:bg-two w-full flex items-center text-white p-2.5 rounded-full justify-between relative'>
            <div className='flex items-center px-1 gap-x-1'>
              <Image
                src={"/logo.png"}
                alt='logo'
                width={48}
                height={48}
                className='w-10 aspect-square'
              />
            </div>
            <div className='hidden lg:block'>
              <nav className=''>
                <ul className='flex gap-x-10 text-[#0f0f0f] lg:text-white flex-col lg:flex-row gap-y-3'>
                  <li>
                    <Link
                      href='/'
                      className={`after:transition-all after:content-[''] after:block after:h-1 relative after:absolute after:-bottom-1.5 after:bg-four after:rounded-full after:right-1/2 after:translate-x-1/2 ${
                        pathname === "/"
                          ? "after:w-5"
                          : "after:w-0 hover:after:w-5 lg:text-[#cdcdcd] hover:lg:text-white"
                      }`}>
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/about'
                      className={`after:transition-all after:content-[''] after:block after:h-1 relative after:absolute after:-bottom-1.5 after:bg-four after:rounded-full after:right-1/2 after:translate-x-1/2 ${
                        pathname === "/about"
                          ? "after:w-5"
                          : "after:w-0 hover:after:w-5 lg:text-[#cdcdcd] hover:lg:text-white"
                      }`}>
                      Tentang Kami
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/gallery'
                      className={`after:transition-all after:content-[''] after:block after:h-1 relative after:absolute after:-bottom-1.5 after:bg-four after:rounded-full after:right-1/2 after:translate-x-1/2 ${
                        pathname === "/gallery"
                          ? "after:w-5"
                          : "after:w-0 hover:after:w-5 lg:text-[#cdcdcd] hover:lg:text-white"
                      }`}>
                      Galeri
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/service'
                      className={`after:transition-all after:content-[''] after:block after:h-1 relative after:absolute after:-bottom-1.5 after:bg-four after:rounded-full after:right-1/2 after:translate-x-1/2 ${
                        pathname === "/service"
                          ? "after:w-5"
                          : "after:w-0 hover:after:w-5 lg:text-[#cdcdcd] hover:lg:text-white"
                      }`}>
                      Layanan
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className=''>
              <Link
                aria-label='Halaman User'
                href={auth ? "/dashboard" : "/login"}
                className='rounded-full block active:ring ring-[rgba(255,255,255,.3)] hover:scale-110 transition-all'>
                <svg width='40' height='40' fill='none'>
                  <circle
                    cx='20'
                    cy='16.667'
                    r='5'
                    stroke='#fff'
                    stroke-linecap='round'
                    stroke-width='2'
                  />
                  <circle
                    cx='20'
                    cy='20'
                    r='15'
                    stroke='#fff'
                    stroke-width='2'
                  />
                  <path
                    fill='#fff'
                    d='M29.634 31.377a.477.477 0 0 0 .223-.592c-.643-1.61-1.881-3.03-3.555-4.063C24.494 25.605 22.28 25 20 25s-4.494.605-6.302 1.722c-1.674 1.034-2.912 2.452-3.555 4.063-.09.224.01.476.223.592a20.019 20.019 0 0 0 19.268 0Z'
                  />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </header>
      <div className='absolute lg:hidden block w-full h-[200px] top-0 -z-10 bg-[radial-gradient(182.47%_138.78%_at_54.3%_-25.92%,_#4E663F_0%,#68BF32_100%)] rounded-b-[25px]'></div>
    </>
  );
};

export default Header;
