"use client";

import Image from "next/image";
import "./style.css";
import { FaExclamation } from "react-icons/fa6";

export default function RegisterOrderPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleValidation = () => {};

  return (
    <main>
      <section className="px-4 pb-16 pt-6">
        <div className="container">
          <form method="post" onSubmit={handleSubmit}>
            <Image
              src="/image/sumi-tailor-v1.jpg"
              alt="logo"
              width={150}
              height={150}
              className="mx-auto rounded-full border border-[#ddd] mb-3"
              priority
            />
            <h1 className="text-[#21334A] text-lg font-one font-semibold mb-3">
              MENDAFTAR PESANAN
            </h1>
            <div className="mb-3 bg-[#FCEFEF] border border-fail text-fail py-2 px-3 font-medium rounded-sm flex flex-col max-w-xl divide-y divide-fail">
              <div className="flex items-center gap-x-2 py-0.5">
                <div className="flex items-center justify-center rounded-full border-fail border min-w-4 aspect-square text-[11px]">
                  <FaExclamation />
                </div>
                Lorem
              </div>
              <div className="flex items-center gap-x-2 py-0.5">
                <div className="flex items-center justify-center rounded-full border-fail border min-w-4 aspect-square text-[11px]">
                  <FaExclamation />
                </div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Itaque, ea!
              </div>
              <div className="flex items-center gap-x-2 py-0.5">
                <div className="flex items-center justify-center rounded-full border-fail border min-w-4 aspect-square text-[11px]">
                  <FaExclamation />
                </div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Fuga,
                reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Itaque, ea!
              </div>
            </div>
            <div className="columns-1 gap-3 sm:columns-2">
              <div className="form-input border border-[#DDDDDD] rounded-sm relative mb-3">
                <label
                  htmlFor="name"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  NAME<span className="text-fail">*</span>
                </label>
                <input
                  type="text"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="name"
                  id="name"
                />
              </div>
              <div className="form-input border border-[#DDDDDD] rounded-sm relative mb-3">
                <label
                  htmlFor="email"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  EMAIL<span className="text-fail">*</span>
                </label>
                <input
                  type="text"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="email"
                  id="email"
                />
              </div>
              <div className="form-input border border-[#DDDDDD] rounded-sm relative mb-3">
                <label
                  htmlFor="nohp"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  NO HANDPHONE<span className="text-fail">*</span>
                </label>
                <input
                  type="text"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="nohp"
                  id="nohp"
                />
              </div>
              <div className="form-input border border-[#DDDDDD] rounded-sm relative mb-3">
                <label
                  htmlFor="address"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  ALAMAT<span className="text-fail">*</span>
                </label>
                <input
                  type="text"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="address"
                  id="address"
                />
              </div>
              <div className="form-input border border-[#DDDDDD] rounded-sm relative mb-3">
                <label
                  htmlFor="price"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  HARGA
                </label>
                <input
                  type="number"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="price"
                  id="price"
                />
              </div>
            </div>
            <div className="form-input border border-[#DDDDDD] rounded-sm relative md:mt-3 mb-5">
              <label
                htmlFor="description"
                className="text-[#21334A] text-sm font-bold absolute top-0 pt-1 left-3 bg-white right-0">
                DESKRIPSI<span className="text-fail">*</span>
              </label>
              <textarea
                rows={3}
                className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                name="description"
                id="description"></textarea>
            </div>
            <div className="form-input">
              <button
                type="submit"
                className="py-2 px-3 bg-two rounded-sm text-white block w-full font-semibold font-two text-lg hover:bg-four  focus:ring focus:ring-[rgba(179,203,166,.5)]">
                SIMPAN
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
