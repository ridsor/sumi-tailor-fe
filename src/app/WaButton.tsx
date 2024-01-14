"use client";

import { FaArrowUpLong } from "react-icons/fa6";
import logoWhatsapp from "@/assets/img/icons/logo-whatsapp.svg";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WaButton() {
  const [chatWa, setChatWa] = useState<string>("");

  const getFormatChatWa = () => {
    let result = null;
    const now = Date.now();
    const time = parseInt(
      Intl.DateTimeFormat("id-ID", {
        hour: "numeric",
      }).format(now)
    );

    if (time >= 18) {
      result = "Malam";
    } else if (time >= 15) {
      result = "Sore";
    } else if (time >= 11) {
      result = "Siang";
    } else {
      result = "Pagi";
    }

    setChatWa(`Selamat ${result} Pak/Ibu`);
  };

  useEffect(() => {
    getFormatChatWa();
  }, [getFormatChatWa]);

  return (
    <div id="contact-us" className="fixed bottom-[6.2rem] right-10">
      <a href={`https://wa.me/6282244007725?text='${chatWa}'`} target="_blank">
        <div className="w-10 aspect-square bg-[#2BB741] p-1 rounded-full shadow-md">
          <Image src={logoWhatsapp} alt="whatsapp" />
        </div>
      </a>
      <div className="absolute -translate-y-1/2 top-1/2 -left-[6.3rem]">
        <div className="absolute block w-5 rotate-45 -translate-y-1/2 bg-white aspect-square -right-0.5 top-1/2 scale-90"></div>
        <div className="px-3 py-1 text-[#0f0f0f] bg-white  whitespace-nowrap rounded-xl [box-shadow:0_0_.5rem_0rem_rgba(0,0,0,.2)]">
          <span className="relative z-10">Contact Us</span>
        </div>
      </div>
      <div className="absolute -translate-x-1/2 -bottom-10 left-1/2">
        <div className="flex items-center justify-center w-8 p-1 bg-white rounded-full [box-shadow:0_0_.5rem_0rem_rgba(0,0,0,.2)] aspect-square">
          <FaArrowUpLong className="fill-gray-500" />
        </div>
      </div>
    </div>
  );
}
