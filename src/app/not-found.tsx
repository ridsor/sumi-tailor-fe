"use client";

import Footer from "@/components/layouts/MainLayout/Footer";
import Header from "@/components/layouts/MainLayout/Header";
import Image from "next/image";
import Link from "next/link";
import image_notfound from "@/assets/img/404-not-found.png";

export default function notfound() {
  return (
    <>
      {<Header />}
      <main>
        <section className="bg-three">
          <div className="container px-4">
            <div className="min-h-[600px] md:pb-0 md:pt-0 pt-36 pb-16 flex items-center flex-col md:flex-row gap-y-10">
              <div className="relative md:flex-[.5] min-w-fit flex-1">
                <h1 className="font-bold font-one text-3xl text-black">404</h1>
                <h2 className="font-semibold font-one text-xl text-black">
                  Ooops!
                </h2>
                <h2 className="font-semibold font-one text-xl text-black mb-3">
                  Page Not Found
                </h2>
                <p className="text-two text-sm mb-6">
                  This page doesnt exist or was removed!
                  <br />
                  We suggent you back yto home
                </p>
                <Link
                  href="/"
                  className="relative inline-block before:rounded-full before:content-[''] before:block before:w-full before:h-full before:absolute before:-top-0.5 before:-left-0.5 before:bg-four">
                  <div className="px-6 py-2 text-black border border-black rounded-full bg-transparent relative">
                    Back to home
                  </div>
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <Image
                  src={image_notfound}
                  alt="404"
                  width={300}
                  height={300}
                  className="w-[80%] md:w-fit"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      {<Footer />}
    </>
  );
}
