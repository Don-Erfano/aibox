'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { IChartProps } from './interface';
import { ApexOptions } from 'apexcharts';

const AreaChart: FC<IChartProps> = ({
  className,
  data,
  title = '',
  height = 350,
  horizontalCategories,
  fillColor = '#BAFBF9',
  enableTooltip = true,
}) => {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const defaultOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: height,
      width: '100%',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: 'inherit',
      animations: {
        enabled: true,
      },
      redrawOnWindowResize: true,
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: height * 0.8,
          },
          title: {
            style: {
              fontSize: '14px',
            },
          },
          xaxis: {
            labels: {
              style: {
                fontSize: '10px',
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '10px',
              },
            },
          },
        },
      },
    ],
    title: {
      text: title,
      align: 'right',
      style: {
        fontSize: windowWidth < 640 ? '14px' : '16px',
        fontWeight: '500',
        fontFamily: 'inherit',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
      width: [2, 1, 1],
      colors: ['#0D9488', '#A21CAF', '#C2410C'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
        colorStops: [
          [
            {
              offset: 0,
              color: fillColor,
              opacity: 1,
            },
            {
              offset: 100,
              color: '#fff',
              opacity: 0,
            },
          ],
          [
            {
              offset: 0,
              color: '#fff',
              opacity: 0,
            },
            {
              offset: 100,
              color: '#fff',
              opacity: 0,
            },
          ],
          [
            {
              offset: 0,
              color: '#fff',
              opacity: 0,
            },
            {
              offset: 100,
              color: '#fff',
              opacity: 0,
            },
          ],
        ],
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: horizontalCategories,
      labels: {
        style: {
          colors: '#52525B',
          fontFamily: 'inherit',
          fontSize: windowWidth < 640 ? '10px' : '12px',
          fontWeight: 400,
        },
        rotate: windowWidth < 640 ? -45 : 0,
        offsetY: windowWidth < 640 ? 10 : 0,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      tickAmount: windowWidth < 640 ? 3 : 4,
      labels: {
        style: {
          colors: '#5E6566',
          fontFamily: 'inherit',
          fontSize: windowWidth < 640 ? '10px' : '12px',
        },
        formatter: (value: number) => Math.round(value).toString(),
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      enabled: enableTooltip,
      theme: 'light',
      shared: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        const value = series[seriesIndex][dataPointIndex];
        return (
          '<div dir="rtl" class="apexcharts-tooltip-box" style="' +
          'background-color: #171919;' +
          'border-radius: 6px;' +
          '">' +
          '<div style="display: flex; align-items: center;">' +
          `<span style="
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          padding:0 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        ">` +
          '<span>کاربران جدید:</span>' +
          `<span>${Math.round(value)}</span>` +
          '</span>' +
          '</div>' +
          '</div>'
        );
      },
      marker: {
        show: true,
      },
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: () => 'کاربران جدید',
        },
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      style: {
        fontSize: '14px',
        fontFamily: 'inherit',
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetY: 0,
      },
    },
    legend: {
      horizontalAlign: 'left',
      itemMargin: {
        horizontal: 8,
      },
      markers: {
        offsetX: 4,
      },
    },
  };

  return (
    <div
      className={clsx(
        'w-full p-4',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      <Chart
        options={defaultOptions}
        series={data}
        type="area"
        height={height}
        width="100%"
      />
    </div>
  );
};

export default AreaChart;
