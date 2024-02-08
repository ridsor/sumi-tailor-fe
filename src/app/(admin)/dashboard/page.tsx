import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { abbreviateNumber, getMonthForChart } from "@/utils/dashboard";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Metadata } from "next";
const DashboardChart = dynamic(
  () => {
    return import("./DashbordCharts");
  },
  {
    ssr: false,
  }
);

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    icons: {
      icon: ["/favicon.ico"],
      apple: ["/apple-touch-icon.png"],
      shortcut: ["/apple-touch-icon.png"],
    },
    title: "Sumi Tailor",
    description:
      "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
    authors: [
      {
        name: "Ryan Syukur",
        url: process.env.BASE_URL,
      },
    ],

    openGraph: {
      type: "website",
      title: "Sumi Tailor",
      images: [process.env.BASE_URL + "/image/sumi-tailor-v1.jpg"],
      description:
        "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
    },
  };
};

export default async function DashboardPage() {
  const chartOrder: {
    options: ApexOptions;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  } = {
    series: [
      {
        name: "Pesanan",
        data: [31, 40, 28, 51, 42, 109],
      },
    ],
    options: {
      title: {
        text: "Pesanan",
      },
      colors: ["#445E36", "#E91E63", "#9C27B0"],
      fill: {
        colors: ["#B3CBA6", "#E91E63", "#9C27B0"],
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: getMonthForChart(),
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  const chartIncome: {
    options: ApexOptions;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  } = {
    series: [
      {
        name: "Penghasilan",
        data: [400000, 1000000, 2000000, 1500000, 4200000, 1090000],
      },
    ],
    options: {
      title: {
        text: "Penghasilan",
      },
      colors: ["#445E36", "#E91E63", "#9C27B0"],
      fill: {
        colors: ["#B3CBA6", "#E91E63", "#9C27B0"],
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: getMonthForChart(),
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

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
            <DashboardChart chartIncome={chartIncome} chartOrder={chartOrder} />
          </div>
        </div>
      </section>
    </>
  );
}
