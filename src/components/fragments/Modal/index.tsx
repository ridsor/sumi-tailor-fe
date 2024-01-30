"use client";

import { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  active: boolean;
  close: () => void;
  bg?: string;
};

export default function Modal({ children, active, close, bg }: Props) {
  useEffect(() => {
    if (active) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [active]);

  return (
    <div
      className={`${
        active ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-all fixed bg-[rgba(0,0,0,.5)] top-0 bottom-0 right-0 left-0 z-50`}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 z-10"
        onClick={close}
      ></div>
      <div className="w-full h-full overflow-auto py-5">
        <div className="mx-auto w-full  max-w-[500px] flex items-center min-h-full">
          <div
            className={`w-full rounded-md min-h-fit shadow-md relative z-20 ${
              !bg ? "bg-white" : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
