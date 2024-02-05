"use client";

import { FaSearch } from "react-icons/fa";
import AdminList from "./AdminList";
import AdminInput from "./AdminInput";

import { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const AccountPage = () => {
  const [isModal, setModal] = useState<boolean>(false);

  const opencloseModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  return (
    <>
      <section>
        <div className="container max-w-full">
          <div className="p-4">
            <h1 className="text-3xl font-one mb-3 tracking-wide font-semibold">
              Admin
            </h1>
            <button
              onClick={() => setModal(true)}
              className="fixed bottom-5 right-5 p-3 border border-white bg-two text-white rounded-md text-xl hover:bg-four focus:ring focus:ring-[rgba(179,203,166,.5)] z-40">
              <FaPlus />
            </button>
            <AdminInput active={isModal} opencloseModal={opencloseModal} />
            <div className="search relative w-full max-w-[400px] mb-3">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 pr-8 py-1 rounded-md border  w-full"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-3">
                <FaSearch />
              </button>
            </div>
            <AdminList opencloseModal={opencloseModal} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
