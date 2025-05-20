import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { IChartProps } from './interface';
import { ApexOptions } from 'apexcharts';
import * as Chart from 'react-apexcharts';

const AreaChart: FC<IChartProps> = ({
  className,
  data,
  title = '',
  height = 350,
  lineColor = '#2A918E',
  fillColor = '#2A918E',
  enableTooltip = true,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxValue = Math.max(...data.map((item) => item.y));
  const padding = maxValue * 0.000001;

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
      width: 2,
      colors: [lineColor],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: fillColor,
            opacity: 0.45,
          },
          {
            offset: 100,
            color: fillColor,
            opacity: 0.05,
          },
        ],
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: data.map((item) => item.x),
      labels: {
        style: {
          colors: '#5E6566',
          fontFamily: 'inherit',
          fontSize: windowWidth < 640 ? '10px' : '12px',
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
      max: maxValue + padding,
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
  };

  const series = [
    {
      name: title,
      data: data.map((item) => item.y),
    },
  ];

  return (
    <div
      className={clsx(
        'w-full p-4',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      <Chart.default
        options={defaultOptions}
        series={series}
        type="area"
        height={height}
        width="100%"
      />
    </div>
  );
};

export default AreaChart;
