"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { IDonutChartProps } from "./interface";
import { TrendingDown, TrendingUp } from "lucide-react";

/**
 * DonutChart component that visualizes data in a donut chart format
 *
 * @component
 *
 * @example
 * const data = [
 *   { name: "Category 1", amount: 1000, color: "#FF0000" },
 *   { name: "Category 2", amount: 2000, color: "#00FF00" }
 * ];
 *
 * return (
 *   <DonutChart
 *     data={data}
 *     title="Sample Donut Chart"
 *   />
 * );
 */

const CHART_COLORS = {
  primary: ["#267FE5", "#6EE1F8", "#DD4B39", "#990099"],
};

const DonutChart: FC<IDonutChartProps> = ({
  data,
  title,
  showLegends,
  total,
  loading,
  colors,
}) => {
  const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut" as ApexChart["type"],
    },
    theme: {
      palette: "palette1",
    },
    colors: colors || CHART_COLORS.primary,
    labels: data.map((item) => item.name),
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "iransans",
      },
      custom: ({ series, seriesIndex }) =>
        '<div style="padding:8px; background-color: #171919; color: #fff; ">' +
        "<span>" +
        data[seriesIndex].name +
        " : " +
        series[seriesIndex].toLocaleString() +
        "</span>" +
        "</div>",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: false,
            name: {
              show: true,
              offsetY: -0,
            },
            value: {
              show: true,
              offsetY: 2,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
  };

  const series = data.map((item) => item.amount);

  if (loading)
    return (
      <div className="h-[120px] w-[120px] animate-pulse rounded-full bg-gray-100" />
    );

  return (
    <div className="gap-x-6 gap-y-4">
      {title ? (
        <h2 className="text-h4 mb-6 text-center font-medium text-[#322D73]">
          {title}
        </h2>
      ) : null}
      <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
        <Chart
          options={chartOptions}
          series={series}
          type="donut"
          height={120}
          width={120}
        />
        {total?.suffix ? (
          <div className="flex">
            <span className="text-grey-main absolute top-[30%] left-1/2 flex -translate-x-1/2 translate-y-[calc(50%-10px)] items-center gap-1 text-sm font-medium">
              {Number(total.value) > 0 ? (
                <TrendingUp
                  className="size-5 text-green-500"
                  strokeWidth={1.5}
                />
              ) : (
                <TrendingDown
                  className="size-5 text-red-500"
                  strokeWidth={1.5}
                />
              )}
              {`${Math.abs(Math.floor(Number(total.value || 0))).toFixed(0)}%`}
            </span>
            <span className="text-grey-main absolute left-1/2 mt-1.5 w-20 -translate-x-1/2 translate-y-[calc(50%-10px)] text-center text-[10px] font-medium text-gray-500">
              {total.suffix}
            </span>
          </div>
        ) : null}
      </div>

      {showLegends && (
        <div className="mt-6 flex w-full items-center justify-center gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="flex w-full items-center justify-between px-3">
                <div
                  className="flex size-4 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      CHART_COLORS.primary[index % CHART_COLORS.primary.length],
                  }}
                >
                  <div className="flex size-2 items-center justify-center rounded-full bg-white" />
                </div>
                <span className="text-h6 font-normal text-gray-500">
                  {item.name}
                </span>
              </div>

              <div className="flex w-full whitespace-nowrap">
                <span className="text-h5 font-normal text-gray-600">
                  {item.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonutChart;
