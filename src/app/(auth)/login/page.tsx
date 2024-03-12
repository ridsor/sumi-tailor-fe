import login1 from "@/assets/img/login1.png";
import Image from "next/image";
import FormLogin from "./FormLogin";
import { Metadata } from "next";

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

const LoginPage = () => {
  return (
    <main>
      <section className="pt-24 md:pb-4 bg-three">
        <div className="container max-w-full">
          <div className="min-h-[500px] flex flex-wrap justify-center">
            <article className="w-full lg:w-[calc(100%-500px)] ">
              <div className="flex items-center w-full h-full">
                <div className="bg-[#E4EEDD] h-full w-full md:rounded-tr-xl md:rounded-br-xl md:shadow-sm flex justify-center items-center">
                  <div className="p-4">
                    <div className="w-[300px] hidden lg:block">
                      <Image src={login1} alt="" className="w-full" priority />
                    </div>
                    <h1 className="text-3xl text-center md:text-4xl font-bold tracking-wide">
                      Selamat Datang Kembali
                    </h1>
                  </div>
                </div>
              </div>
            </article>
            <article className="w-full md:w-[500px]">
              <div className="flex justify-center items-center p-8 h-full">
                <div className="w-full">
                  <h2 className="font-one font-bold text-3xl mb-1">Login</h2>
                  <p className="mb-6">
                    Silakan masuk ke akun Anda menggunakan informasi yang sudah
                    terdaftar.
                  </p>
                  <FormLogin />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
