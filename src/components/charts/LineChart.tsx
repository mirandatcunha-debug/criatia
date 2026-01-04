"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface LineChartProps {
  data: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  height?: number;
  colors?: string[];
}

export function LineChart({
  data,
  categories,
  height = 350,
  colors = ["#AB54DB", "#00A389"],
}: LineChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#ECEAF3",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#A3A3A3",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#A3A3A3",
          fontSize: "12px",
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#464255",
      },
    },
    tooltip: {
      theme: "light",
    },
  };

  return (
    <div className="w-full">
      <Chart options={options} series={data} type="line" height={height} />
    </div>
  );
}
