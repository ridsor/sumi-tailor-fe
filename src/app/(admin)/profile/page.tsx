"use client";

import { useState } from "react";
import user_img from "@/assets/img/user-img.svg";
import FormProfilDetail from "./FormProfileDetail";
import FormProfilPassword from "./FormProfilePassword";
import Image from "next/image";

const ProfilePage = () => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  return (
    <>
      <section>
        <div className="container max-w-full">
          <div className="p-4">
            <h1 className="text-3xl font-one tracking-wide mb-3 font-semibold">
              Profil
            </h1>
            <form method="post">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 rounded-full aspect-square overflow-hidden">
                  <Image
                    src={user_img}
                    alt=""
                    className="w-full h-full"
                    priority
                  />
                </div>
                <button className="px-3 py-2 bg-one text-white rounded-md font-semibold hover:bg-[rgba(72,60,50,.5)] focus:ring focus:ring-[rgba(72,60,50,.5)]">
                  Upload
                </button>
                <button className="px-3 py-2 bg-gray-200 text-one rounded-md font-semibold hover:bg-gray-300 focus:ring focus:ring-[rgba(209,213,219,.5)]">
                  Hapus
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsChangePassword((prev) => !prev)}
              className="px-3 mb-4 py-2 bg-gray-200 text-one rounded-md font-semibold hover:bg-gray-300 focus:ring focus:ring-[rgba(209,213,219,.5)]">
              {isChangePassword ? "Ubah Detail" : "Ubah Password"}
            </button>
            {isChangePassword ? <FormProfilPassword /> : <FormProfilDetail />}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
