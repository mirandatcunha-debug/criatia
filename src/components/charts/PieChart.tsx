"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PieChartProps {
  data: number[];
  labels: string[];
  height?: number;
  colors?: string[];
}

export function PieChart({
  data,
  labels,
  height = 300,
  colors = ["#AB54DB", "#00A389", "#FFBB54", "#58CDFF", "#FF5B5B"],
}: PieChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    colors: colors,
    labels: labels,
    legend: {
      position: "bottom",
      labels: {
        colors: "#464255",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              color: "#464255",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 280,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="w-full flex justify-center">
      <Chart options={options} series={data} type="donut" height={height} />
    </div>
  );
}
