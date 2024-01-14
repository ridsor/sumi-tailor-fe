import { Josefin_Sans, Quicksand } from "next/font/google";

export const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const josenfin_sans = Josefin_Sans({
  variable: "--font-josenfin-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
