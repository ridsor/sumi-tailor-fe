import { FaArrowRightLong } from "react-icons/fa6";

import home1 from "@/assets/img/home1.png";
import Link from "next/link";
import Image from "next/image";
import WaButton from "./WaButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sumi Tailor",
  description:
    "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
  openGraph: {
    type: "website",
    title: "Sumi Tailor",
    images: [process.env.BASE_URL + "/image/sumi-tailor.png"],
    description:
      "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
  },
};

const HomePage = () => {
  return (
    <main>
      <section className="bg-three">
        <div className="container">
          <div className="row pt-36 min-h-[600px] h-auto px-4 flex flex-wrap">
            <article className="w-full lg:w-1/2">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-wide font-one text-one">
                Selamat Datang di Sumi Tailor <br />
                Kami Tempat Fashion Bertemu Kesempurnaan!
              </h2>
              <p className="text-one w-5/6 mb-6">
                Apakah Anda lelah berjuang dengan pakaian yang tidak pas? Apakah
                Anda bermimpi mengenakan pakaian yang disesuaikan dengan bentuk
                dan gaya tubuh unik Anda? Tidak perlu mencari lagi! Tim penjahit
                terampil dan berpengalaman kami hadir untuk mewujudkan aspirasi
                mode Anda.
              </p>
              <div className="flex gap-x-3 mb-6">
                <Link
                  href="/orders"
                  className="text-three bg-two py-3 px-5 rounded-full flex items-center gap-x-1.5 hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)]">
                  Cek Pesanan
                  <FaArrowRightLong className="fill-three" />
                </Link>
                <Link
                  href="/about"
                  className="text-two border border-two hover:bg-four hover:text-three py-3 px-5 rounded-full flex items-center gap-x-1.5 focus:ring focus:ring-[rgba(179,203,166,.5)]">
                  Selengkapnya
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
  );
};

export default HomePage;
