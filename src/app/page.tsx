import { FaArrowRightLong } from "react-icons/fa6";
import home1 from "@/assets/img/home1.png";
import Link from "next/link";
import Image from "next/image";
import WaButton from "./WaButton";
import { Metadata } from "next";
import { Suspense } from "react";
import MainLoading from "./MainLoading";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  title: "Sumi Tailor",
  description:
    "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
  authors: [
    {
      name: "Ryan Syukur",
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
  ],

  openGraph: {
    type: "website",
    title: "Sumi Tailor",
    images: [process.env.NEXT_PUBLIC_BASE_URL + "/image/sumi-tailor-v1.jpg"],
    description:
      "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<MainLoading />}>
      <main>
        <section className="bg-three py-36 ">
          <div className="container">
            <div className="row h-auto px-4 flex flex-wrap">
              <article className="w-full lg:w-1/2">
                <h2 className="mb-4 text-3xl lg:text-4xl tracking-wide font-one text-one">
                  Sel amat Datang di{" "}
                  <span className="whitespace-nowrap">Sumi Tailor</span>
                  <br />
                  Kami Tempat Fashion Bertemu Kesempurnaan!
                </h2>
                <p className="text-one w-5/6 mb-6">
                  Apakah Anda lelah berjuang dengan pakaian yang tidak pas?
                  Apakah Anda bermimpi mengenakan pakaian yang disesuaikan
                  dengan bentuk dan gaya tubuh unik Anda? Tidak perlu mencari
                  lagi! Tim penjahit terampil dan berpengalaman kami hadir untuk
                  mewujudkan aspirasi mode Anda.
                </p>
                <div className="flex gap-x-3 mb-6">
                  <Link
                    href="/about"
                    className="text-two bg-transparent py-2 px-3 sm:py-3 sm:px-5 border border-two rounded-lg flex items-center gap-x-1.5 hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)]">
                    Selengkapnya
                  </Link>
                  <Link
                    href="/order-list"
                    className="text-three bg-two py-2 px-3 sm:py-3 sm:px-5 rounded-lg flex items-center gap-x-1.5 hover:bg-[#638d4c] focus:ring focus:ring-[rgba(179,203,166,.5)]">
                    Cek Pesanan Anda
                    <FaArrowRightLong className="fill-three" />
                  </Link>
                </div>
              </article>
              <article className="w-full lg:w-1/2">
                <div className="flex justify-center">
                  <div className="w-[400px]">
                    <Image
                      src={home1}
                      alt=""
                      className="w-full h-full object-cover"
                      priority
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        <WaButton />
      </main>
    </Suspense>
  );
}
