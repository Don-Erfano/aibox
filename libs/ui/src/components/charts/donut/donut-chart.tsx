'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { IDonutChartProps } from './interface';

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
  primary: ['#267FE5', '#6EE1F8', '#DD4B39', '#990099'],
};

const DonutChart: FC<IDonutChartProps> = ({
  data,
  title,
  showLegends,
  total,
  loading,
  colors,
}) => {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut' as ApexChart['type'],
    },
    theme: {
      palette: 'palette1',
    },
    colors: colors || CHART_COLORS.primary,
    labels: data.map((item) => item.name),
    tooltip: {
      style: {
        fontSize: '14px',
        fontFamily: 'iransans',
      },
      custom: ({ series, seriesIndex }) =>
        '<div style="padding:8px; background-color: #171919; color: #fff; ">' +
        '<span>' +
        data[seriesIndex].name +
        ' : ' +
        series[seriesIndex].toLocaleString() +
        '</span>' +
        '</div>',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
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
      <div className="bg-gray-100 animate-pulse w-[120px] h-[120px] rounded-full" />
    );

  return (
    <div className="gap-x-6 gap-y-4">
      {title ? (
        <h2 className="mb-6 text-center text-h4 font-medium text-[#322D73]">
          {title}
        </h2>
      ) : null}
      <div
        className="relative mx-auto flex w-full max-w-md items-center
          justify-center"
      >
        <Chart
          options={chartOptions}
          series={series}
          type="donut"
          height={120}
          width={120}
        />
        {total?.suffix ? (
          <>
            <span
              className="absolute left-1/2 top-[30%] -translate-x-1/2 translate-y-[calc(50%-10px)]
            text-xl font-medium text-grey-main"
            >
              {total.value}
            </span>
            <span
              className="absolute left-1/2 top-[50%] -translate-x-1/2 translate-y-[calc(50%-10px)]
            text-sm font-medium text-grey-main text-gray-500"
            >
              {total.suffix}
            </span>
          </>
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
                  <div
                    className="flex size-2 items-center justify-center
                    rounded-full bg-white"
                  />
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
