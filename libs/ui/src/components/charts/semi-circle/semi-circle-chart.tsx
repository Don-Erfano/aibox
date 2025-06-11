'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

import type { ISemiCircleProps } from './interface';
/**
 * SemiCircleChart component that visualizes data in a donut chart format
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
 *   <SemiCircleChart
 *     data={data}
 *     title="Sample Donut Chart"
 *   />
 * );
 */

const SemiCircleChart: FC<ISemiCircleProps> = ({ data, label, isLoading }) => {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    colors: [data > 0 ? '#0F766E' : '#C2410C'],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 4,
          size: '60px',
        },
        dataLabels: {
          name: {
            color: '#2F3233',
            fontSize: '20px',
            fontWeight: 500,
            fontFamily: 'iransans',
          },
        },
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#E3E5E5',
        },
      },
    },
    labels: [label],
  };

  if (isLoading)
    return (
      <div className="bg-gray-100 animate-pulse w-[100px] h-[100px] mx-auto rounded-full" />
    );
  return (
    <Chart
      options={options}
      series={[Math.abs(data)]}
      type="radialBar"
      width={204}
    />
  );
};

export default SemiCircleChart;
