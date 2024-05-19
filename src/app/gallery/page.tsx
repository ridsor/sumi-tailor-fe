import { Metadata } from "next";
import GalleryList from "./GalleryList";

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

const GalleryPage = () => {
  return (
    <main>
      <section className="bg-[#E4EEDD] py-36">
        <div className="container px-4">
          <div>
            <h2 className="mb-2 text-3xl text-center font-pt-serif">
              Galeri Karya Jahitan Kami
            </h2>
            <p className="mb-8 text-center">
              Telusuri berbagai karya jahitan eksklusif yang telah kami ciptakan
              dengan dedikasi. Setiap potong pakaian adalah hasil dari keahlian
              tinggi dan perhatian pada detail, dibuat khusus untuk memberikan
              sentuhan elegan dan kenyamanan bagi Anda.
            </p>
            <GalleryList />
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
