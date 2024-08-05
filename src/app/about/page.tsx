import { FaPhone, FaScissors } from "react-icons/fa6";
import { TbNeedleThread } from "react-icons/tb";
import imageAboutUs from "@/assets/img/image-aboutus.jpeg";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      <section className='relative pt-[125px] mb-[125px] min-h-[600px]'>
        <div className='container'>
          <div className='w-[300px] h-[95%] absolute left-[20%] top-0 bg-[#FFFFE5] border-b-[.5rem] border-two lg:block hidden'></div>
          <article className="row px-4 lg:px-8 relative z-10 after:content-[''] after:clear-both after:block">
            <div className='absolute top-[10rem] left-[37rem] w-20 h-12 bg-[rgba(68,94,54,.4)] hidden lg:block'></div>
            <div className='absolute top-[2rem] right-1/2 translate-x-1/2 lg:-translate-x-0 lg:top-[8rem] lg:right-0 block'>
              <svg width='190' height='160' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80 '
                  stroke='#445E36'
                  fill='transparent'
                />
              </svg>
            </div>
            <div className='px-8 mb-12 lg:px-0 lg:float-left lg:mr-12'>
              <div className="w-full max-w-72 rounded-[16px] border-[.5rem] mx-auto relative after:content-[''] after:block after:w-2 after:h-9 after:absolute after:-right-4 after:bottom-4 after:bg-two">
                <Image
                  src={imageAboutUs}
                  alt=''
                  className='w-full h-full bg-cover'
                  priority
                />
                <div className='absolute -bottom-20 lg:-bottom-16 -right-10'>
                  <TbNeedleThread size='1.5rem' />
                </div>
                <div className='absolute block -left-7 top-8'>
                  <div className='p-3 bg-[#EBEBEB]'>
                    <FaScissors size='1rem' />
                  </div>
                </div>
              </div>
            </div>
            <article
              className={` bg-[0_150px] bg-no-repeat bg-contain bg-[url("/image/needle_thread.png")] md:bg-none `}>
              <h2 className='mb-8 text-3xl font-bold lg:text-4xl'>
                Tentang Kami
              </h2>
              <p className="first-letter:ml-6 lg:first-letter:ml-0 ml-0 mb-5 lg:ml-[calc(6rem+18rem)] font-pt-serif tracking-wide text-base before:content-[''] relative lg:before:block before:w-4 lg:before:w-9 before:border before:border-[#3d3d3d] before:absolute before:top-3 before:left-0 lg:before:-left-12 leading-7">
                Selamat datang di <span className='font-bold'>Sumi Tailor</span>
                , di mana kreativitas bertemu keahlian! Dengan hasrat untuk
                fashion dan dedikasi untuk memberikan layanan menjahit yang
                sempurna, kami telah mengubah kain menjadi pakaian yang
                berkulitas di mata semua orang sejak didirikan. Di Sumi Tailor,
                kami bangga dengan tim terampil kami yang terdiri dari penjahit
                wanita berbakat yang menghadirkan keahlian dan perhatian mereka
                pada detail di setiap proyek. Dengan pengalaman bertahun-tahun
                di industri ini, kami telah mengasah keterampilan kami dan
                menyempurnakan teknik kami, memastikan bahwa setiap jahitan yang
                kami buat merupakan bukti komitmen kami terhadap keunggulan.
              </p>
              <br />
              <p className='text-base leading-7 tracking-wide font-pt-serif'>
                Saat Anda memilih Sumi Tailor, Anda memilih profesionalisme,
                kreativitas, dan keahlian yang tak tertandingi. Kami bersemangat
                dengan apa yang kami lakukan dan bangga dengan kemampuan kami
                untuk mewujudkan impian menjahit pakaian Anda. Hubungi kami hari
                ini untuk mendiskusikan proyek menjahit atau kebutuhan perubahan
                Anda. Biarkan kami menjadi mitra tepercaya Anda dalam
                menciptakan pakaian yang membuat Anda terlihat dan merasa
                terbaik.
              </p>
            </article>
          </article>
        </div>
      </section>
      <section>
        <div className='flex row bg-[#fff] text-one flex-wrap max-w-[1920px] w-full mx-auto'>
          <article className='order-2 w-full lg:w-1/2 lg:order-1'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.8549338008533!2d128.16671191355354!3d-3.6604171291839878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6c8dc1bf97fa07%3A0xc63f2c19509a52d1!2sSumi%20Tailor!5e0!3m2!1sid!2sid!4v1689394716607!5m2!1sid!2sid'
              className='w-full h-60'
              loading='lazy'
              title='store location'></iframe>
          </article>
          <article className='order-1 w-full lg:w-1/2 lg:order-2'>
            <div className='pt-6 pb-3 px-7 lg:pb-0'>
              <h5 className='text-base font-bold leading-none'>Alamat</h5>
              <p className='mb-6 tracking-tighter'>
                Jln. Ir. M. Putuhena Perumnas Wayame Blok 3 Baru No. 138, Desa
                Wayane RT007/RW013, Wayame, Kec. Tlk. Ambon, Kota Ambon, Maluku
                97234
              </p>
              <div className='flex items-center mb-6 text-two gap-x-3 font-bold'>
                <FaPhone className='fill-one' /> 0813-4400-7725
              </div>
              <h5 className='mb-2 text-base font-bold leading-none'>
                Jam Buka
              </h5>
              <p className='mb-3'>
                <span className='font-bold'>Setiap Hari : </span>
                9:00WIT - 18:00WIT
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
