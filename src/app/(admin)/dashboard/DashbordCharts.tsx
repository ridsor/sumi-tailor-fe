"use client";

import { abbreviateNumber } from "@/utils/dashboard";
import Chart from "react-apexcharts";

interface Props {
  chartOrder: {
    options: any;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  };
  chartIncome: {
    options: any;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  };
}

export default function ChartDashboard(props: Props) {
  props.chartOrder.options.yaxis = {
    labels: {
      formatter: (value: number) => value.toFixed(0),
    },
  };
  props.chartIncome.options.yaxis = {
    labels: {
      formatter: (value: number) => "Rp. " + abbreviateNumber(value),
    },
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-5">
      <div className="w-full lg:w-1/2">
        <div className="mx-auto overflow-x-auto overflow-hidden">
          <div className="w-[400px] lg:w-full lg:max-w-[500px] mx-auto">
            <Chart
              options={props.chartOrder.options}
              series={props.chartOrder.series}
              type="area"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="mx-auto overflow-x-auto overflow-hidden">
          <div className="w-[400px] lg:w-full lg:max-w-[500px] mx-auto">
            <Chart
              options={props.chartIncome.options}
              series={props.chartIncome.series}
              type="area"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
