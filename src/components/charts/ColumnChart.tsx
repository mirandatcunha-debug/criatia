"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ColumnChartProps {
  data: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  height?: number;
  colors?: string[];
}

export function ColumnChart({
  data,
  categories,
  height = 300,
  colors = ["#AB54DB"],
}: ColumnChartProps) {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
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
    tooltip: {
      theme: "light",
    },
  };

  return (
    <div className="w-full">
      <Chart options={options} series={data} type="bar" height={height} />
    </div>
  );
}
