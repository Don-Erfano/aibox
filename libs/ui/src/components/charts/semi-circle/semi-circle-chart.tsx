import { FC } from 'react';
import { ApexOptions } from 'apexcharts';
import * as Chart from 'react-apexcharts';

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

const SemiCircleChart: FC<ISemiCircleProps> = ({ data, label }) => {
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

  return (
    <Chart.default
      options={options}
      series={[Math.abs(data)]}
      type="radialBar"
      height={272}
    />
  );
};

export default SemiCircleChart;
