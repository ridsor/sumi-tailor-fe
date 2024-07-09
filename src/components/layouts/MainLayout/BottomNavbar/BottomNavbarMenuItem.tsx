import Link from "next/link";
import { MutableRefObject } from "react";

interface Props {
  icon: React.ReactNode;
  text: string;
  href: string;
  menuItemRef: MutableRefObject<HTMLDivElement | null>;
}

export default function BottomNavbarMenuItem(props: Props) {
  return (
    <div
      ref={props.menuItemRef}
      className='menu-item w-[50px] h-[50px] flex items-center justify-center flex-col relative z-10 top-6'>
      <Link
        href={props.href}
        className='icon-menu w-[45px] min-h-[45px] rounded-full flex items-center justify-center'>
        {props.icon}
      </Link>
      <span className='text-white text-[12px] mt-[17px]'>{props.text}</span>
    </div>
  );
}
