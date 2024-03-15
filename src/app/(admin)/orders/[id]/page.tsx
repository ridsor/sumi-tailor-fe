import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
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
};

export default function page() {
  return (
    <main>
      <section className="py-15">
        <div className="container">
          <h1 className="font-bold text-xl border-b px-4 py-2 border-five">
            Detail Pesanan
          </h1>
          <div className="px-4">
            <h2 className="font-semibold text-base border-b py-2 mb-3 border-five">
              Pesanan Selesai
            </h2>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>Nama</span>
                <span id="name">Ryan Syukur</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>Email</span>
                <span id="name">ridsorgamerz@gmail.com</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>No Handphone</span>
                <span id="name">082211981226</span>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex justify-between flex-1">
                <span>Alamat</span>
                <span id="name">Wayame</span>
              </div>
            </div>
            <div className="flex mb-3">
              <div className="flex justify-between flex-1">
                <span>Tanggal Pembelian</span>
                <span id="date">10 Januari 2024, 09:23 WIB</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-y-8">
            <div
              className="border rounded-md py-2 px-3 border-five"
              id="description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                repellendus corrupti minima minus accusantium ut inventore, ad
                cum possimus excepturi laboriosam, perferendis neque molestiae
                itaque voluptas at eius, explicabo ipsam debitis ab voluptate
                impedit labore illum? Tempore, nihil neque molestiae voluptatem
                mollitia sapiente illum explicabo ipsam laborum, rerum adipisci
                facere quas modi, quibusdam natus fugiat quasi est at optio
                aliquam in. Omnis, at officiis necessitatibus saepe, rem quis
                totam maiores animi, vel obcaecati eum dolor delectus eveniet!
                Nobis eveniet deleniti consequatur debitis quas ipsa voluptatum
                veritatis vero iste fuga cupiditate, iure vitae ipsum porro
                provident eaque eum dolor totam architecto?
              </p>
              <hr className="my-3 border-five" />
              <div className="text-[12px]">Total Harga</div>
              <div className="font-bold">Rp55.000</div>
            </div>
            <button className="py-3 px-6 bg-two text-white mt-5 rounded-md font-bold tracking-wider uppercase mx-auto block">
              Konfirmasi
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
