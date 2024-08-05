import { FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='hidden lg:block'>
      <article className='bg-two text-three p-6 pb-[calc(70px+24px)] lg:pb-6'>
        <p className='text-center'>
          Copyright &copy; 2023 Sumi Tailor.
          <br className='lg:hidden' /> All Rights Reserved
        </p>
      </article>
    </footer>
  );
};

export default Footer;
