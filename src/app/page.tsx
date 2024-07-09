import { FaArrowRightLong } from "react-icons/fa6";
import home1 from "@/assets/img/home1.png";
import Link from "next/link";
import Image from "next/image";
import WaButton from "./WaButton";
import { Metadata } from "next";
import { Suspense } from "react";
import MainLoading from "./MainLoading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import carousel1 from "@/assets/img/images/carousel/Hero1 3.png";
import carousel2 from "@/assets/img/images/carousel/Hero2 1.png";
import carousel3 from "@/assets/img/images/carousel/hero3 2.png";
import carousel4 from "@/assets/img/images/carousel/hero4 2.png";
import carousel5 from "@/assets/img/images/carousel/hero5 1.png";

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
        <section className='pt-[125px] mb-16 lg:mb-28'>
          <div className='container'>
            <div className='mx-auto w-full max-w-[325px] lg:max-w-[800px] bg-[rgba(214,210,210,0.35)] rounded-[12px] backdrop-blur-sm'>
              <Carousel>
                <CarouselContent className='p-4'>
                  <CarouselItem>
                    <Image
                      src={carousel1}
                      alt=''
                      width={1000}
                      height={1000}
                      className='h-[215px] lg:h-[300px] mx-auto object-contain'
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src={carousel2}
                      alt=''
                      width={1000}
                      height={1000}
                      className='h-[215px] lg:h-[300px] mx-auto object-contain'
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src={carousel3}
                      alt=''
                      width={1000}
                      height={1000}
                      className='h-[215px] lg:h-[300px] mx-auto object-contain'
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src={carousel4}
                      alt=''
                      width={1000}
                      height={1000}
                      className='h-[215px] lg:h-[300px] mx-auto object-contain'
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <Image
                      src={carousel5}
                      alt=''
                      width={1000}
                      height={1000}
                      className='h-[215px] lg:h-[300px] mx-auto object-contain'
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='hover:bg-[hsla(60,100%,97.1%,.8)]' />
                <CarouselNext className='hover:bg-[hsla(60,100%,97.1%,.8)]' />
              </Carousel>
            </div>
          </div>
        </section>
        <section className='mb-[calc(125px+24px)] bg-center bg-no-repeat bg-contain bg-[url("/image/needle_thread.png")] md:bg-none '>
          <div className='container'>
            <div className='row h-auto flex flex-wrap'>
              <article className='w-full lg:w-1/2'>
                <h2 className='mb-4 text-3xl lg:text-4xl tracking-wide font-one text-one'>
                  Selamat Datang di{" "}
                  <span className='whitespace-nowrap'>Sumi Tailor</span>
                  <br />
                  Kami Tempat Fashion Bertemu Kesempurnaan!
                </h2>
                <p className='text-one w-5/6 mb-3 text-[13px] md:text-sm lg:text-base'>
                  Apakah Anda lelah berjuang dengan pakaian yang tidak pas?
                  Apakah Anda bermimpi mengenakan pakaian yang disesuaikan
                  dengan bentuk dan gaya tubuh unik Anda? Tidak perlu mencari
                  lagi! Tim penjahit terampil dan berpengalaman kami hadir untuk
                  mewujudkan aspirasi mode Anda.
                </p>
                <div className='flex gap-3 flex-wrap'>
                  <Link
                    href='/about'
                    className='text-two bg-transparent py-1.5 px-5 border border-[#63AE34] rounded-md hover:bg-two hover:text-background focus:ring focus:ring-[rgba(179,203,166,.5)]'>
                    Selengkapnya
                  </Link>
                  <Link
                    href='/order-list'
                    className='text-three bg-two py-1.5 px-5 rounded-md flex items-center gap-x-1.5 hover:bg-[#638d4c] focus:ring focus:ring-[rgba(179,203,166,.5)]'>
                    Cek Pesanan
                    <FaArrowRightLong className='fill-three' />
                  </Link>
                </div>
              </article>
              <article className='w-full lg:w-1/2 hidden lg:block'>
                <div className='flex justify-center'>
                  <div className='w-[400px]'>
                    <Image
                      src={home1}
                      alt=''
                      className='w-full h-full object-cover'
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
