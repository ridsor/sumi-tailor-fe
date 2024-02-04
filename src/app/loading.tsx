"use client";

import { usePathname } from "next/navigation";
import DashboardLoading from "@/app/(admin)/dashboard/loading";

const Loading = () => {
  const pathname = usePathname();

  if (pathname !== "/") {
    return <DashboardLoading />;
  }

  return (
    <main className="animate-pulse">
      <section className="bg-three">
        <div className="container">
          <div className="row pt-36 min-h-[600px] h-auto px-4 flex flex-wrap">
            <article className="w-full lg:w-1/2">
              <div className="bg-[#bdc3c7] rounded-md mt-5 mb-8 h-[100px]"></div>
              <div className="bg-[#bdc3c7] rounded-md h-[120px] mb-8"></div>
              <div className="flex gap-4 mb-5">
                <div className="bg-[#bdc3c7] rounded-md h-[45px] w-[144px]"></div>
                <div className="bg-[#bdc3c7] rounded-md h-[45px] w-[144px]"></div>
              </div>
            </article>
            <article className="w-full lg:w-1/2 flex justify-center">
              <div className="bg-[#bdc3c7] rounded-md w-[350px] h-[350px] mt-5 mb-10"></div>
            </article>
          </div>
        </div>
      </section>
      <div></div>
    </main>
  );
};

export default Loading;
