import { useState } from "react";
import { FaBars, FaCircle, FaUser } from "react-icons/fa6";

const Header = () => {
  const [hamburger, setHamburger] = useState<boolean>(false);

  return (
    <header>
      <div className="container px-2 py-4 mx-auto">
        <article className="bg-[#0f0f0f] w-full flex items-center text-white p-2.5 rounded-full lg:justify-between relative">
          <div className="flex items-center order-1 px-2 left gap-x-1">
            <FaCircle className="fill-white" size="1rem" />
            <span className="text-base font-bold">Sumi Tailor</span>
          </div>
          <div className="order-3 center lg:order-2">
            <button
              className="block p-2 mx-2 lg:hidden"
              onClick={() => setHamburger((prev) => (prev ? false : true))}>
              <FaBars
                className={`${
                  hamburger ? "fill-gray-400" : "fill-white"
                } transition`}
                size="1.7rem"
              />
            </button>
            <nav
              className={`${
                hamburger
                  ? " opacity-100 pointer-events-auto right-0"
                  : "-right-1/3 pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-100"
              } transition-all top-[110%] lg:block lg:static absolute bg-white lg:bg-inherit shadow-md lg:shadow-none p-4 lg:p-0 w-full max-w-[250px] lg:w-auto lg:max-w-none lg:rounded-none rounded-md lg:border-none border`}>
              <ul className="flex gap-x-10 text-[#0f0f0f] lg:text-gray-400 flex-col lg:flex-row gap-y-3">
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">About Us</a>
                </li>
                <li>
                  <a href="">Gallery</a>
                </li>
                <li>
                  <a href="">Services</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="order-2 ml-auto right lg:order-3 lg:ml-0">
            <a href="" className="bg-[#2a28f0] p-3 rounded-full block">
              <FaUser className="fill-white" size="1.2rem" />
            </a>
          </div>
        </article>
      </div>
    </header>
  );
};

export default Header;
