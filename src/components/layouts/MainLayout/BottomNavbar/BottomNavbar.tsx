import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import BottomNavbarMenuItem from "./BottomNavbarMenuItem";

export default function BottomNavbar() {
  const pathname = usePathname();
  const menuHomeRef = useRef<HTMLDivElement | null>(null);
  const menuGalleryRef = useRef<HTMLDivElement | null>(null);
  const menuAboutRef = useRef<HTMLDivElement | null>(null);
  const menuServiceRef = useRef<HTMLDivElement | null>(null);
  const menuActiveRef = useRef(null);

  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(menuHomeRef.current, {
        top: 24,
        ease: "power3.inOut",
      });
      gsap.to(menuGalleryRef.current, {
        top: 24,
        ease: "power3.inOut",
      });
      gsap.to(menuServiceRef.current, {
        top: 24,
        ease: "power3.inOut",
      });
      gsap.to(menuAboutRef.current, {
        top: 24,
        ease: "power3.inOut",
      });
      switch (pathname) {
        case "/":
          if (menuHomeRef.current?.getBoundingClientRect().x) {
            const x =
              menuHomeRef.current?.getBoundingClientRect().x -
              menuHomeRef.current?.getBoundingClientRect().width -
              2;
            gsap.to(menuActiveRef.current, { x, ease: "power3.inOut" });
            gsap.to(menuHomeRef.current, {
              top: -8,
              ease: "power3.inOut",
            });
          }
          break;
        case "/gallery":
          if (menuGalleryRef.current?.getBoundingClientRect().x) {
            const x =
              menuGalleryRef.current?.getBoundingClientRect().x -
              menuGalleryRef.current?.getBoundingClientRect().width -
              2;
            gsap.to(menuActiveRef.current, {
              x,
              ease: "power3.inOut",
            });
            gsap.to(menuGalleryRef.current, {
              top: -8,
              ease: "power3.inOut",
            });
          }
          break;
        case "/service":
          if (menuServiceRef.current?.getBoundingClientRect().x) {
            const x =
              menuServiceRef.current?.getBoundingClientRect().x -
              menuServiceRef.current?.getBoundingClientRect().width -
              2;
            gsap.to(menuActiveRef.current, {
              x,
              ease: "power3.inOut",
            });
            gsap.to(menuServiceRef.current, {
              top: -8,
              ease: "power3.inOut",
            });
          }
          break;
        case "/about":
          if (menuAboutRef.current?.getBoundingClientRect().x) {
            const x =
              menuAboutRef.current?.getBoundingClientRect().x -
              menuAboutRef.current?.getBoundingClientRect().width -
              2;
            gsap.to(menuActiveRef.current, {
              x,
              ease: "power3.inOut",
            });
            gsap.to(menuAboutRef.current, {
              top: -8,
              ease: "power3.inOut",
            });
          }
          break;
        default:
          gsap.to(menuActiveRef.current, {
            x: -160,
            ease: "power3.inOut",
          });
          break;
      }
    }, menuActiveRef);
  }, [pathname]);

  return (
    <div className='bottom-navbar lg:hidden bg-[radial-gradient(144.82%_116.73%_at_50%_111.76%,#4E663F_0%,#65B533_100%)] fixed bottom-0 left-0 right-0 rounded-t-[12px] h-[70px] z-50'>
      <div className='container'>
        <div className='flex justify-between gap-1 relative'>
          <div
            className={`menu-active absolute -top-[calc(50%-2px)] -translate-x-40 w-[90px] h-[54px]`}
            ref={menuActiveRef}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='91'
              height='54'
              viewBox='0 0 91 54'
              fill='none'>
              <path
                d='M91 23C72.9096 23 70.629 54 45.5 54C20.371 54 16.4458 23 0 23C20.8313 23 18.6386 23 45.5 23C70.629 23 72.3615 23 91 23Z'
                fill='#E4EEDD'
              />
              <ellipse
                cx='45.0107'
                cy='23'
                rx='22.5054'
                ry='23'
                fill='#74BC47'
              />
            </svg>
          </div>
          <BottomNavbarMenuItem
            text='Beranda'
            menuItemRef={menuHomeRef}
            href='/'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'>
                <path
                  d='M6.25 15.9495C6.25 14.2523 6.25 13.4037 6.59308 12.6578C6.93615 11.9119 7.58046 11.3596 8.86906 10.2551L10.1191 9.18364C12.4482 7.18723 13.6128 6.18903 15 6.18903C16.3872 6.18903 17.5518 7.18723 19.8809 9.18364L21.1309 10.2551C22.4195 11.3596 23.0638 11.9119 23.4069 12.6578C23.75 13.4037 23.75 14.2523 23.75 15.9495V21.25C23.75 23.607 23.75 24.7855 23.0178 25.5177C22.2855 26.25 21.107 26.25 18.75 26.25H11.25C8.89298 26.25 7.71447 26.25 6.98223 25.5177C6.25 24.7855 6.25 23.607 6.25 21.25V15.9495Z'
                  stroke='#fff'
                />
                <path
                  d='M18.125 26.25V19.75C18.125 19.1977 17.6773 18.75 17.125 18.75H12.875C12.3227 18.75 11.875 19.1977 11.875 19.75V26.25'
                  stroke='#fff'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            }
          />
          <BottomNavbarMenuItem
            text='Galeri'
            menuItemRef={menuGalleryRef}
            href='/gallery'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'>
                <path
                  d='M2.5 6.5C2.5 4.29086 4.29086 2.5 6.5 2.5H17.5C19.7091 2.5 21.5 4.29086 21.5 6.5V17.5C21.5 19.7091 19.7091 21.5 17.5 21.5H6.5C4.29086 21.5 2.5 19.7091 2.5 17.5V6.5Z'
                  stroke='#fff'
                  stroke-opacity='1'
                />
                <path
                  d='M2.5 14.4999L5.8055 11.1945C6.68783 10.3122 8.15379 10.4443 8.86406 11.4702L10.7664 14.218C11.4311 15.1781 12.7735 15.3669 13.6773 14.6275L16.0992 12.646C16.8944 11.9954 18.0533 12.0532 18.7798 12.7797L21.5 15.4999'
                  stroke='#fff'
                  stroke-opacity='1'
                />
                <circle
                  cx='16.5'
                  cy='7.5'
                  r='1.5'
                  fill='#fff'
                  fill-opacity='1'
                />
              </svg>
            }
          />
          <BottomNavbarMenuItem
            text='Layanan'
            menuItemRef={menuServiceRef}
            href='/service'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'>
                <path
                  d='M5 19.25C5.4585 19.25 5.75214 18.8904 5.91699 18.6115C6.10162 18.2991 6.25056 17.8804 6.36895 17.4068C6.60767 16.4519 6.75 15.1593 6.75 13.75C6.75 12.3407 6.60767 11.0481 6.36895 10.0932C6.25056 9.61961 6.10162 9.20088 5.91699 8.88851C5.75214 8.60961 5.4585 8.25 5 8.25C4.5415 8.25 4.24786 8.60961 4.08301 8.88851C3.89838 9.20088 3.74944 9.61961 3.63105 10.0932C3.39233 11.0481 3.25 12.3407 3.25 13.75C3.25 15.1593 3.39233 16.4519 3.63105 17.4068C3.74944 17.8804 3.89838 18.2991 4.08301 18.6115C4.24786 18.8904 4.5415 19.25 5 19.25Z'
                  stroke='#fff'
                  stroke-opacity='1'
                />
                <path
                  d='M25 19.25C25.4459 19.25 25.738 18.9069 25.9064 18.6278C26.0932 18.3183 26.2461 17.8981 26.369 17.4068C26.6162 16.4179 26.75 15.103 26.75 13.75C26.75 12.397 26.6162 11.0821 26.369 10.0932C26.2461 9.60188 26.0932 9.18173 25.9064 8.87224C25.738 8.59311 25.4459 8.25 25 8.25'
                  stroke='#fff'
                  stroke-opacity='1'
                  stroke-linecap='round'
                />
                <path
                  d='M25 8.125C25 8.125 20.625 9.375 15 9.375C9.375 9.375 5 8.125 5 8.125'
                  stroke='#fff'
                  stroke-opacity='1'
                  stroke-linecap='round'
                />
                <path
                  d='M5 19.375C5 19.375 8.13049 18.4806 12.5 18.2049M25 19.375C25 19.375 21.8695 18.4806 17.5 18.2049'
                  stroke='#fff'
                  stroke-opacity='1'
                  stroke-linecap='round'
                />
                <path
                  d='M13.125 9.375V13.75M16.875 9.375V13.75'
                  stroke='#fff'
                  stroke-opacity='1'
                  stroke-linecap='round'
                />
                <circle
                  cx='15'
                  cy='16.25'
                  r='3'
                  stroke='#fff'
                  stroke-opacity='1'
                />
              </svg>
            }
          />
          <BottomNavbarMenuItem
            text='Tentang'
            menuItemRef={menuAboutRef}
            href='/about'
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'>
                <circle
                  cx='15'
                  cy='10'
                  r='3.25'
                  stroke='#fff'
                  stroke-opacity='1'
                  stroke-linecap='round'
                />
                <path
                  d='M17.1017 8.0625C17.3613 7.61288 17.7484 7.25033 18.214 7.02071C18.6796 6.79108 19.2029 6.70469 19.7176 6.77246C20.2324 6.84022 20.7154 7.0591 21.1058 7.40142C21.4961 7.74374 21.7762 8.19411 21.9106 8.6956C22.0449 9.19709 22.0276 9.72716 21.8607 10.2188C21.6938 10.7104 21.3849 11.1415 20.973 11.4576C20.5611 11.7736 20.0647 11.9604 19.5467 11.9944C19.0286 12.0283 18.5121 11.9079 18.0625 11.6483'
                  stroke='#fff'
                  stroke-opacity='1'
                />
                <path
                  d='M12.8983 8.0625C12.6387 7.61288 12.2516 7.25033 11.786 7.02071C11.3204 6.79108 10.7971 6.70469 10.2824 6.77246C9.76763 6.84022 9.28455 7.0591 8.89422 7.40142C8.50388 7.74374 8.22382 8.19411 8.08944 8.6956C7.95507 9.19709 7.97242 9.72716 8.13931 10.2188C8.30619 10.7104 8.61511 11.1415 9.027 11.4576C9.43889 11.7736 9.93525 11.9604 10.4533 11.9944C10.9714 12.0283 11.4879 11.9079 11.9375 11.6483'
                  stroke='#fff'
                  stroke-opacity='1'
                />
                <path
                  d='M15 15.625C20.3061 15.625 21.517 20.0925 21.7933 22.1315C21.8675 22.6788 21.4273 23.125 20.875 23.125H9.125C8.57271 23.125 8.13254 22.6788 8.20671 22.1315C8.48304 20.0925 9.69393 15.625 15 15.625Z'
                  stroke='#fff'
                  stroke-opacity='1'
                  stroke-linecap='round'
                />
                <path
                  d='M24.1848 19.5394L24.6725 19.429L24.1848 19.5394ZM16.3589 15.7324L15.9896 15.3953L15.3692 16.0748L16.2769 16.2256L16.3589 15.7324ZM21.4766 20.625L20.9963 20.764L21.1008 21.125H21.4766V20.625ZM19.375 14.875C20.7742 14.875 21.7386 15.5974 22.4244 16.5734C23.1199 17.5632 23.5005 18.7811 23.6971 19.6498L24.6725 19.429C24.464 18.5078 24.0471 17.1435 23.2426 15.9985C22.4285 14.8399 21.1905 13.875 19.375 13.875V14.875ZM16.7281 16.0695C17.373 15.3632 18.2224 14.875 19.375 14.875V13.875C17.8944 13.875 16.7898 14.5188 15.9896 15.3953L16.7281 16.0695ZM16.2769 16.2256C19.2212 16.7149 20.4626 18.9192 20.9963 20.764L21.9569 20.486C21.3742 18.4717 19.9345 15.8197 16.4408 15.2392L16.2769 16.2256ZM23.27 20.125H21.4766V21.125H23.27V20.125ZM23.6971 19.6498C23.7487 19.8778 23.5791 20.125 23.27 20.125V21.125C24.1441 21.125 24.882 20.355 24.6725 19.429L23.6971 19.6498Z'
                  fill='#fff'
                  fill-opacity='1'
                />
                <path
                  d='M13.6411 15.7324L13.7231 16.2256L14.6308 16.0748L14.0104 15.3953L13.6411 15.7324ZM5.81518 19.5394L6.30285 19.6498L5.81518 19.5394ZM8.52337 20.625V21.125H8.89922L9.00368 20.764L8.52337 20.625ZM10.625 14.875C11.7777 14.875 12.627 15.3632 13.2719 16.0695L14.0104 15.3953C13.2102 14.5188 12.1056 13.875 10.625 13.875V14.875ZM6.30285 19.6498C6.49944 18.7811 6.88013 17.5632 7.57559 16.5734C8.26142 15.5974 9.22578 14.875 10.625 14.875V13.875C8.80953 13.875 7.57152 14.8399 6.75738 15.9985C5.95288 17.1435 5.53602 18.5078 5.32751 19.429L6.30285 19.6498ZM6.73 20.125C6.42083 20.125 6.25124 19.8778 6.30285 19.6498L5.32751 19.429C5.11793 20.355 5.85591 21.125 6.73 21.125V20.125ZM8.52337 20.125H6.73V21.125H8.52337V20.125ZM9.00368 20.764C9.53738 18.9192 10.7788 16.7149 13.7231 16.2256L13.5592 15.2392C10.0655 15.8197 8.62584 18.4717 8.04307 20.486L9.00368 20.764Z'
                  fill='#fff'
                  fill-opacity='1'
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
