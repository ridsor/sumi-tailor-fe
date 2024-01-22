import Chart from "./DashbordCharts";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { abbreviateNumber } from "@/utils/dashboard";

export default function DashboardPage() {
  return (
    <>
      <section className="pt-10">
        <div className="container max-w-full">
          <div className="p-4">
            <div className="flex flex-wrap gap-y-2 lg:gap-y-0 mb-8">
              <div className="w-full lg:w-4/12">
                <div className="flex items-center h-full">
                  <h1 className="font-semibold font-one text-3xl tracking-wide mb-3 lg:mb-0">
                    Dashboard
                  </h1>
                </div>
              </div>
              <div className="w-full lg:w-8/12">
                <div className="flex gap-2 h-full">
                  <div className="w-1/2 h-full">
                    <div className="h-full p-3 flex items-center justify-center bg-white border-[#d7d3cc] border w-full max-w-[300px] mx-auto rounded-xl">
                      <div>
                        <div className="text-center font-semibold">
                          Total Pesanan Hari Ini
                        </div>
                        <div className="flex justify-center items-center gap-2 flex-col lg:flex-row">
                          <div className="value font-bold text-xl lg:text-2xl">
                            99
                          </div>
                          <div className="font-bold text-success flex items-center gap-1">
                            <FaArrowUpLong className="text-[13px]" />
                            <span>+1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 h-full">
                    <div className="flex items-center justify-center h-full p-3s bg-white border-[#d7d3cc] border w-full max-w-[300px] mx-auto rounded-xl">
                      <div>
                        <div className="text-center font-semibold">
                          Total Penghasilan Hari Ini
                        </div>
                        <div className="flex justify-center items-center gap-2 flex-col lg:flex-row">
                          <div className="value font-bold text-xl lg:text-2xl">
                            Rp. {abbreviateNumber(1300000)}
                          </div>
                          <div className="font-bold text-fail flex items-center gap-1">
                            <FaArrowDownLong className="text-[13px]" />
                            <span>-1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Chart />
          </div>
        </div>
      </section>
    </>
  );
}
