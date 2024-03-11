"use client";

import Image from "next/image";
import "./style.css";
import { FaExclamation } from "react-icons/fa6";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

interface RegisterOrderInput {
  name: string;
  email: string;
  no_hp: string;
  address: string;
  price: string;
  description: string;
}

export default function RegisterOrderPage() {
  const searchParams = useSearchParams();
  const [inputs, setInputs] = useState<RegisterOrderInput>({
    name: "",
    email: "",
    no_hp: "",
    address: "",
    price: "",
    description: "",
  });
  const [validate, setValidate] = useState<string[]>([]);
  const [isInputLoading, setInputLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputLoading(true);
    setValidate([]);

    const validate = handleValidate(inputs);
    if (validate.length > 0) {
      setValidate(validate);
      setInputLoading(false);
      return;
    }

    try {
      const token = searchParams.get("token") || "";

      const inputResponse = await fetch(
        (process.env.NEXT_PUBLIC_API_URL as string) +
          "/api/orders?token=" +
          token,
        {
          method: "POST",
          body: JSON.stringify(inputs),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (inputResponse.status != 201) {
        const result = await inputResponse.json();
        console.error("Failed to input");
        if (typeof result.errors.email != "undefined") {
          setValidate((prev) => [...prev, result.errors.email]);
        }
        if (typeof result.errors.no_hp != "undefined") {
          setValidate((prev) => [...prev, result.errors.no_hp]);
        }
        setInputLoading(false);
        return;
      }

      withReactContent(Swal)
        .mixin({
          customClass: {
            popup: "max-w-[200px] w-full h-[100px]",
            icon: "scale-50 -translate-y-8",
          },
          buttonsStyling: false,
        })
        .fire({
          position: "top-end",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
    } catch (e) {
      console.log(e);
    }

    setInputLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleValidate = (inputs: RegisterOrderInput): string[] => {
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
    if (!inputs.no_hp) {
      result.push("No Handphone tidak boleh kosong");
    } else if (isNaN(Number(inputs.no_hp))) {
      result.push("No Handphone harus angka");
    } else if (inputs.no_hp.length >= 20) {
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
            {validate.length > 0 && (
              <div
                className={`mb-3 transition-all validate bg-[#FCEFEF] border border-fail text-fail py-2 px-3 font-medium rounded-sm flex flex-col max-w-xl divide-y divide-fail`}>
                {validate.map((x, i) => (
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
                  htmlFor="no_hp"
                  className="text-[#21334A] text-sm font-bold absolute top-1 left-3">
                  NO HANDPHONE<span className="text-fail">*</span>
                </label>
                <input
                  type="text"
                  className="font-medium h-full w-full rounded-sm px-3 pt-7 pb-3 focus:[box-shadow:0_0_3px_3px_rgba(68,94,54,.7)] outline-none"
                  name="no_hp"
                  id="no_hp"
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
                {isInputLoading ? "Loading..." : "SIMPAN"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
