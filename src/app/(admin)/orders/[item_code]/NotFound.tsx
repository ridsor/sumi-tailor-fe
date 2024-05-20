import Image from "next/image";
import Link from "next/link";
import image_notfound from "@/assets/img/404-not-found.png";

export default function NotFound() {
  return (
    <main>
      <section className="bg-three">
        <div className="container px-4">
          <div className="min-h-[600px] md:pb-0 md:pt-0 pt-36 pb-16 flex items-center flex-col md:flex-row gap-y-10">
            <div className="relative md:flex-[.5] min-w-fit flex-1">
              <h1 className="font-bold font-one text-3xl text-black">404</h1>
              <h2 className="font-semibold font-one text-xl text-black">
                Uuups!
              </h2>
              <h2 className="font-semibold font-one text-xl text-black mb-3">
                Pesanan Tidak Ditemukan
              </h2>
              <p className="text-two text-sm mb-6">
                Pesanan ini tidak ada atau telah dihapus!
                <br />
                Kami menyarankan Anda kembali ke rumah
              </p>
              <Link
                href="/orders"
                className="relative inline-block before:rounded-full before:content-[''] before:block before:w-full before:h-full before:absolute before:-top-0.5 before:-left-0.5 before:bg-four">
                <div className="px-6 py-2 text-black border border-black rounded-full bg-transparent relative">
                  Kembali Ke Daftar Pesanan
                </div>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <Image
                src={image_notfound}
                alt="404"
                width={300}
                height={300}
                className="w-[80%] md:w-fit"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
