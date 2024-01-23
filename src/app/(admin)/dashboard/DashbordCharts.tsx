"use client";

import { useState } from "react";
import { ApexOptions } from "apexcharts";
import { abbreviateNumber, getMonthForChart } from "@/utils/dashboard";
import Chart from "react-apexcharts";

export default function ChartDashboard() {
  const [chartOrder] = useState<{
    options: ApexOptions;
    series: any;
  }>({
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
  });

  const [chartIncome] = useState<{
    options: ApexOptions;
    series: any;
  }>({
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
      yaxis: {
        labels: {
          formatter: (value) => "Rp. " + abbreviateNumber(value),
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  });

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-5">
      <div className="w-full lg:w-1/2">
        <div className="mx-auto overflow-x-auto overflow-hidden">
          <div className="w-[400px] lg:w-full lg:max-w-[500px] mx-auto">
            <Chart
              options={chartOrder.options}
              series={chartOrder.series}
              type="area"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="mx-auto overflow-x-auto overflow-hidden">
          <div className="w-[400px] lg:w-full lg:max-w-[500px] mx-auto">
            <Chart
              options={chartIncome.options}
              series={chartIncome.series}
              type="area"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
