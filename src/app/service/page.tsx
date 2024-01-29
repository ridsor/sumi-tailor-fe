import { FaBox, FaGear, FaPencil } from "react-icons/fa6";
import { GiLargeDress, GiStickingPlaster } from "react-icons/gi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const ServicePage = () => {
  return (
    <>
      <section className="bg-[#E4EEDD]">
        <div className="container">
          <div className="px-4 pb-16 pt-36">
            <h2 className="mb-2 text-3xl text-center font-pt-serif">
              Layanan Menjahit Kami - Bentuk Keinginan Fashion Anda
            </h2>
            <p className="mb-8 text-center">
              Kami bersemangat untuk mewujudkan aspirasi fesyen Anda melalui
              rangkaian lengkap layanan menjahit kami. Tim pengrajin dan
              penjahit terampil kami berdedikasi untuk memberikan pengalaman
              yang tak tertandingi, memastikan bahwa setiap pakaian adalah
              cerminan sejati dari gaya dan kepribadian unik Anda.
            </p>
            <div className="grid grid-cols-1 gap-7 row md:grid-cols-2 lg:grid-cols-3">
              <article className="p-4 bg-three rounded-xl">
                <div className="mb-3 w-14 aspect-square">
                  <FaPencil className="w-full h-full" />
                </div>
                <h3 className="mb-2 text-base font-medium">Kreasi Kostum</h3>
                <p>
                  Temukan seni mode pesanan saat kami merancang dan membuat
                  pakaian unik yang disesuaikan dengan ukuran dan preferensi
                  spesifik Anda. Dari gaun malam yang elegan hingga setelan
                  bisnis yang tajam.
                </p>
              </article>
              <article className="p-4 bg-three rounded-xl">
                <div className="mb-3 w-14 aspect-square">
                  <FaGear className="w-full h-full" />
                </div>
                <h3 className="mb-2 text-base font-medium">Perubahan Pakar</h3>
                <p>
                  Percayalah pada keahlian kami untuk merevitalisasi lemari
                  pakaian Anda yang ada dengan layanan perubahan terbaik kami.
                  Baik itu menyesuaikan kecocokan gaun atau mengubah setelan
                  menjadi sempurna.
                </p>
              </article>
              <article className="p-4 bg-three rounded-xl">
                <div className="mb-3 w-14 aspect-square">
                  <GiLargeDress className="w-full h-full" />
                </div>
                <h3 className="mb-2 text-base font-medium">Bridal Couture</h3>
                <p>
                  Tim kami memahami pentingnya gaun pengantin Anda, dan kami
                  sangat bangga dalam menciptakan mahakarya pengantin yang
                  membuat Anda merasa seperti seorang ratu di hari besar Anda.
                </p>
              </article>
              <article className="p-4 bg-three rounded-xl">
                <div className="mb-3 w-14 aspect-square">
                  <GiStickingPlaster className="w-full h-full" />
                </div>
                <h3 className="mb-2 text-base font-medium">
                  Perbaikan Pakaian
                </h3>
                <p>
                  Ucapkan selamat tinggal pada kerusakan lemari pakaian dengan
                  layanan perbaikan pakaian kami. Pengrajin kami bekerja dengan
                  rajin untuk memperbaiki air mata, mengganti ritsleting, dan
                  memperbaiki ketidaksempurnaan apa pun, menghidupkan kembali
                  pakaian favorit Anda.
                </p>
              </article>
              <article className="p-4 bg-three rounded-xl">
                <div className="mb-3 w-14 aspect-square">
                  <HiOutlineChatBubbleLeftRight className="w-full h-full" />
                </div>
                <h3 className="mb-2 text-base font-medium">
                  Konsultasi Penataan Gaya
                </h3>
                <p>
                  Ucapkan selamat tinggal pada kerusakan lemari pakaian dengan
                  layanan perbaikan pakaian kami. Pengrajin kami bekerja dengan
                  rajin untuk memperbaiki air mata, mengganti ritsleting, dan
                  memperbaiki ketidaksempurnaan apa pun, menghidupkan kembali
                  pakaian favorit Anda.
                </p>
              </article>
              <article className="p-4 bg-three rounded-xl">
                <div className="mb-3 w-14 aspect-square">
                  <FaBox className="w-full h-full" />
                </div>
                <h3 className="mb-2 text-base font-medium">Paket Grup</h3>
                <p>
                  Untuk grup atau acara yang membutuhkan keseragaman atau
                  pakaian yang terkoordinasi, kami menawarkan paket khusus yang
                  dirancang untuk memenuhi kebutuhan spesifik Anda. Dari pakaian
                  korporat hingga kostum pertunjukan, kami memastikan ansambel
                  yang mulus dan bergaya.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;
