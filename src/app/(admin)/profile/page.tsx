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
      <section className="py-16">
        <div className="container max-w-full">
          <div className="p-4">
            <h1 className="text-3xl font-one tracking-wide mb-3 font-semibold">
              Profil
            </h1>
            <form method="post">
              <div className="flex items-center gap-4 mb-4">
                <label
                  htmlFor="image"
                  className="w-24 rounded-full aspect-square overflow-hidden cursor-pointer">
                  <Image
                    src={user_img}
                    alt=""
                    className="w-full h-full"
                    priority
                  />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  hidden
                  accept="image/png, image/jpeg, image/jpg"
                />
                <button
                  type="button"
                  onClick={() => setIsChangePassword((prev) => !prev)}
                  className="px-3 mb-4 py-2 bg-gray-200 text-one rounded-md font-semibold hover:bg-gray-300 focus:ring focus:ring-[rgba(209,213,219,.5)]">
                  {isChangePassword ? "Ubah Detail" : "Ubah Password"}
                </button>
              </div>
            </form>

            {isChangePassword ? <FormProfilPassword /> : <FormProfilDetail />}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
