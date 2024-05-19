import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="flex row bg-[#fff] text-one flex-wrap max-w-[1920px] w-full mx-auto">
        <article className="order-2 w-full lg:w-1/2 lg:order-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248.8549338008533!2d128.16671191355354!3d-3.6604171291839878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d6c8dc1bf97fa07%3A0xc63f2c19509a52d1!2sSumi%20Tailor!5e0!3m2!1sid!2sid!4v1689394716607!5m2!1sid!2sid"
            className="w-full h-60"
            loading="lazy"
            title="store location"></iframe>
        </article>
        <article className="order-1 w-full lg:w-1/2 lg:order-2">
          <div className="pt-6 pb-3 px-7 lg:pb-0">
            <h5 className="text-base font-bold leading-none">Alamat</h5>
            <p className="mb-6 tracking-tighter">
              Jln. Ir. M. Putuhena Perumnas Wayame Blok 3 Baru No. 138, Desa
              Wayane RT007/RW013, Wayame, Kec. Tlk. Ambon, Kota Ambon, Maluku
              97234
            </p>
            <div className="flex items-center mb-6 text-two gap-x-3 font-bold">
              <FaPhone className="fill-one" /> 0813-4400-7725
            </div>
            <h5 className="mb-2 text-base font-bold leading-none">Jam Buka</h5>
            <p className="mb-3">
              <span className="font-bold">Setiap Hari : </span>
              9:00WIT - 18:00WIT
            </p>
          </div>
        </article>
      </div>
      <article className="bg-two text-three p-6">
        <p className="text-center">
          Copyright &copy; 2023 Sumi Tailor. All Rights Reserved.
        </p>
      </article>
    </footer>
  );
};

export default Footer;
