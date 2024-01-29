import { FaScissors } from "react-icons/fa6";
import { TbNeedleThread } from "react-icons/tb";
import imageAboutUs from "@/assets/img/image-aboutus.jpeg";
import Image from "next/image";

const AboutPage = () => {
  return (
    <main>
      <section className="bg-three relative">
        <div className="container">
          <div className="w-[300px] h-[95%] absolute left-[20%] top-0 bg-[#FFFFE5] border-b-[.5rem] border-two lg:block hidden"></div>
          <article className="row lg:min-h-[600px] px-4 lg:px-8 pt-36 pb-16 relative z-10 after:content-[''] after:clear-both after:block">
            <div className="absolute top-[10rem] left-[37rem] w-20 h-12 bg-[rgba(68,94,54,.4)] hidden lg:block"></div>
            <div className="absolute top-[30rem] right-[10%] lg:top-[57%] lg:left-[22rem] block">
              <TbNeedleThread size="1.5rem" />
            </div>
            <div className="absolute top-[2rem] right-1/2 translate-x-1/2 lg:-translate-x-0 lg:top-[8rem] lg:right-0 block">
              <svg width="190" height="160" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80 "
                  stroke="#445E36"
                  fill="transparent"
                />
              </svg>
            </div>
            <div className="px-8 mb-12 lg:px-0 lg:float-left lg:mr-12">
              <div className="w-72 border-[.5rem] mx-auto relative after:content-[''] after:block after:w-2 after:h-9 after:absolute after:-right-4 after:bottom-4 after:bg-two">
                <Image
                  src={imageAboutUs}
                  alt=""
                  className="w-full h-full bg-cover"
                  priority
                />
                <div className="absolute block -left-7 top-8">
                  <div className="p-3 bg-[#EBEBEB]">
                    <FaScissors size="1rem" />
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mt-12 mb-8 text-3xl font-bold lg:text-5xl">
              About Us
            </h2>
            <p className="first-letter:ml-6 lg:first-letter:ml-0 ml-0 mb-5 lg:ml-[calc(6rem+18rem)] font-pt-serif tracking-wide text-base before:content-[''] relative lg:before:block before:w-4 lg:before:w-9 before:border before:border-[#3d3d3d] before:absolute before:top-3 before:left-0 lg:before:-left-12 leading-7">
              Selamat datang di <span className="font-bold">Sumi Tailor</span>,
              di mana kreativitas bertemu keahlian! Dengan hasrat untuk fashion
              dan dedikasi untuk memberikan layanan menjahit yang sempurna, kami
              telah mengubah kain menjadi pakaian yang berkulitas di mata semua
              orang sejak didirikan. Di Sumi Tailor, kami bangga dengan tim
              terampil kami yang terdiri dari penjahit wanita berbakat yang
              menghadirkan keahlian dan perhatian mereka pada detail di setiap
              proyek. Dengan pengalaman bertahun-tahun di industri ini, kami
              telah mengasah keterampilan kami dan menyempurnakan teknik kami,
              memastikan bahwa setiap jahitan yang kami buat merupakan bukti
              komitmen kami terhadap keunggulan.
            </p>
            <br />
            <p className="text-base leading-7 tracking-wide font-pt-serif">
              Saat Anda memilih Sumi Tailor, Anda memilih profesionalisme,
              kreativitas, dan keahlian yang tak tertandingi. Kami bersemangat
              dengan apa yang kami lakukan dan bangga dengan kemampuan kami
              untuk mewujudkan impian menjahit pakaian Anda. Hubungi kami hari
              ini untuk mendiskusikan proyek menjahit atau kebutuhan perubahan
              Anda. Biarkan kami menjadi mitra tepercaya Anda dalam menciptakan
              pakaian yang membuat Anda terlihat dan merasa terbaik.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
