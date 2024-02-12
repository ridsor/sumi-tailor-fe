"use client";

import { FaArrowUpLong } from "react-icons/fa6";
import logoWhatsapp from "@/assets/img/icons/logo-whatsapp.svg";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import "./style.css";

export default function WaButton() {
  const [chatWa, setChatWa] = useState<string>("");
  const [isAnimationContactUs, setAnimationContactUs] =
    useState<string>("mode1");

  const getFormatChatWa = useCallback(() => {
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
  }, []);

  useEffect(() => {
    const animationContactUs = setInterval(() => {
      setAnimationContactUs((prev) => {
        if (prev == "mode2") {
          return "mode3";
        }
        return "mode2";
      });
    }, 4000);
    return () => {
      clearInterval(animationContactUs);
    };
  }, []);

  useEffect(() => {
    getFormatChatWa();
  }, [getFormatChatWa]);

  return (
    <div id="contact-us" className="fixed bottom-[6.2rem] right-10">
      <a href={`https://wa.me/6281344007725?text='${chatWa}'`} target="_blank">
        <div className="w-10 aspect-square bg-[#2BB741] p-1 rounded-full shadow-md">
          <Image src={logoWhatsapp} alt="whatsapp" />
        </div>
      </a>
      <div
        className={`absolute -translate-y-1/2 top-1/2 overflow-hidden animate-contact-us ${
          isAnimationContactUs != "mode1"
            ? isAnimationContactUs == "mode3"
              ? "animate-contact-us-out"
              : "animate-contact-us-in"
            : ""
        }`}>
        <div className="absolute block w-5 rotate-45 -translate-y-1/2 bg-white aspect-square right-2.5 top-1/2 scale-90"></div>
        <div className="px-3 py-1 text-[#0f0f0f] bg-white overflow-hidden whitespace-nowrap rounded-xl [box-shadow:0_0_.5rem_0rem_rgba(0,0,0,.2)]">
          <span className="relative z-10">Contact Us</span>
        </div>
      </div>
      <div className="absolute -translate-x-1/2 -bottom-10 left-1/2 animate-pulse">
        <div className="flex items-center justify-center w-8 p-1 bg-white rounded-full [box-shadow:0_0_.5rem_0rem_rgba(0,0,0,.2)] aspect-square">
          <FaArrowUpLong className="fill-gray-500" />
        </div>
      </div>
    </div>
  );
}
