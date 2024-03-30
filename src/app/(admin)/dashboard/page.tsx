import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { abbreviateNumber, getMonthForChart } from "@/utils/dashboard";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Metadata } from "next";
import { getDashboard } from "@/services/dashboard";
const DashboardChart = dynamic(() => import("./DashbordCharts"), {
  ssr: false,
});

export const revalidate = 0;

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
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
        url: process.env.NEXT_PUBLIC_BASE_URL,
      },
    ],

    openGraph: {
      type: "website",
      title: "Sumi Tailor",
      images: [process.env.NEXT_PUBLIC_BASE_URL + "/image/sumi-tailor-v1.jpg"],
      description:
        "Temukan solusi ideal untuk gaya pakaian Anda! Tim penjahit kami siap membantu Anda mengatasi kesulitan dengan pakaian yang tidak pas. Dengan keahlian dan pengalaman kami, kami menciptakan pakaian yang disesuaikan dengan bentuk dan gaya tubuh unik Anda. Mulailah mewujudkan impian mode Anda sekarang!",
    },
  };
};

export default async function DashboardPage() {
  const dashboard = await getDashboard().catch((e) => console.error(e));
  const order_total = dashboard.data.map(
    (x: { order_total: number }) => x.order_total
  );
  const total_income = dashboard.data.map(
    (x: { total_income: number }) => x.total_income
  );
  const chartOrder: {
    options: ApexOptions;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  } = {
    series: [
      {
        name: "Pesanan",
        data: order_total,
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
        data: total_income,
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
      <section className="py-16">
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
                          Total Pesanan Bulan Ini
                        </div>
                        <div className="flex justify-center items-center gap-2 flex-col lg:flex-row">
                          <div className="value font-bold text-xl lg:text-2xl">
                            {order_total[5]}
                          </div>
                          <div
                            className={`${
                              order_total[4] == 0 ||
                              Math.round(
                                (order_total[5] / order_total[4]) * 100
                              ) -
                                100 >=
                                0
                                ? "text-success"
                                : "text-fail"
                            } font-bold flex items-center gap-1`}>
                            {order_total[4] != 0 &&
                            Math.round(
                              (order_total[5] / order_total[4]) * 100
                            ) -
                              100 !=
                              0 ? (
                              Math.round(
                                (order_total[5] / order_total[4]) * 100
                              ) -
                                100 >
                              0 ? (
                                <FaArrowUpLong className="text-[13px]" />
                              ) : (
                                <FaArrowDownLong className="text-[13px]" />
                              )
                            ) : (
                              ""
                            )}
                            <span>
                              {order_total[4] != 0 &&
                                Math.round(
                                  (order_total[5] / order_total[4]) * 100
                                ) -
                                  100 >
                                  0 &&
                                "+"}
                              {order_total[4] !== 0
                                ? Math.round(
                                    (order_total[5] / order_total[4]) * 100
                                  ) - 100
                                : 0}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 h-full">
                    <div className="flex items-center justify-center h-full p-3s bg-white border-[#d7d3cc] border w-full max-w-[300px] mx-auto rounded-xl">
                      <div>
                        <div className="text-center font-semibold">
                          Total Penghasilan Bulan Ini
                        </div>
                        <div className="flex justify-center items-center gap-2 flex-col lg:flex-row">
                          <div className="value font-bold text-xl lg:text-2xl">
                            Rp. {abbreviateNumber(total_income[5])}
                          </div>
                          <div
                            className={`${
                              total_income[4] == 0 ||
                              Math.round(
                                (total_income[5] / total_income[4]) * 100
                              ) -
                                100 >=
                                0
                                ? "text-success"
                                : "text-fail"
                            } font-bold flex items-center gap-1`}>
                            {total_income[4] != 0 &&
                            Math.round(
                              (total_income[5] / total_income[4]) * 100
                            ) -
                              100 !==
                              0 ? (
                              Math.round(
                                (total_income[5] / total_income[4]) * 100
                              ) -
                                100 >
                              0 ? (
                                <FaArrowUpLong className="text-[13px]" />
                              ) : (
                                <FaArrowDownLong className="text-[13px]" />
                              )
                            ) : (
                              ""
                            )}
                            <span>
                              {total_income[4] != 0 &&
                                Math.round(
                                  (total_income[5] / total_income[4]) * 100
                                ) -
                                  100 >
                                  0 &&
                                "+"}
                              {total_income[4] !== 0
                                ? Math.round(
                                    (total_income[5] / total_income[4]) * 100
                                  ) - 100
                                : 0}
                              %
                            </span>
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
