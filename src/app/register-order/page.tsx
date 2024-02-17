"use client";

import Image from "next/image";
import "./style.css";
import { FaExclamation } from "react-icons/fa6";
import { useState } from "react";

interface RegisterOrderInput {
  name: string;
  email: string;
  nohp: string;
  address: string;
  price: string;
  description: string;
}

export default function RegisterOrderPage() {
  const [inputs, setInputs] = useState<RegisterOrderInput>({
    name: "",
    email: "",
    nohp: "",
    address: "",
    price: "",
    description: "",
  });
  const [validation, setValidation] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidation([]);

    const validation = handleValidation(inputs);
    if (validation.length > 0) {
      setValidation(validation);
      return;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidation = (inputs: RegisterOrderInput): string[] => {
    const result = [];

    // name
    if (!inputs.name) {
      result.push("Nama tidak boleh kosong");
    } else if (inputs.name.length >= 100) {
      result.push("Nama harus maks 100 karakter");
    }

    // email
    var rs = inputs.email;
    var atps = rs.indexOf("@");
    var dots = rs.lastIndexOf(".");
    if (!inputs.email) {
      result.push("Email tidak boleh kosong");
    } else if (atps < 1 || dots < atps + 2 || dots + 2 >= rs.length) {
      result.push("Email tidak valid");
    } else if (inputs.email.length >= 100) {
      result.push("Email harus maks 100 karakter");
    }

    // no handphone
    if (!inputs.nohp) {
      result.push("No Handphone tidak boleh kosong");
    } else if (isNaN(Number(inputs.nohp))) {
      result.push("No Handphone harus angka");
    } else if (inputs.nohp.length >= 20) {
      result.push("No Handphone harus maks 20 karakter");
    }

    // address
    if (!inputs.address) {
      result.push("Alamat tidak boleh kosong");
    } else if (inputs.address.length >= 500) {
      result.push("Alamat harus maks 500 karakter");
    }

    // price
    if (isNaN(Number(inputs.price))) {
      result.push("Harga harus angka");
    } else if (inputs.price.length >= 100) {
      result.push("Harga harus maks 100 karakter");
    }

    // description
    if (!inputs.description) {
      result.push("Deskripsi tidak boleh kosong");
    } else if (inputs.description.length >= 500) {
      result.push("Deskripsi harus maks 500 karakter");
    }

    return result;
  };

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
            {validation.length > 0 && (
              <div
                className={`mb-3 transition-all validation bg-[#FCEFEF] border border-fail text-fail py-2 px-3 font-medium rounded-sm flex flex-col max-w-xl divide-y divide-fail`}>
                {validation.map((x, i) => (
                  <div className="flex items-center gap-x-2 py-1" key={i}>
                    <div className="flex items-center justify-center rounded-full border-fail border min-w-4 aspect-square text-[11px]">
                      <FaExclamation />
                    </div>
                    {x}
                  </div>
                ))}
              </div>
            )}
            <div className="columns-1 gap-3 sm:columns-2">
              <div className="form-input border border-[#DDDDDD] rounded-sm relative mb-3">
                <label
                  htmlFor="name"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  NAMA<span className="text-fail">*</span>
                </label>
                <input
                  type="text"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-input border border-[#DDDDDD] rounded-sm relative mb-3">
                <label
                  htmlFor="email"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  EMAIL<span className="text-fail">*</span>
                </label>
                <input
                  type="email"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="email"
                  id="email"
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
