import { FC } from 'react';
import { IDonutChartProps } from './interface';
import { ApexOptions } from 'apexcharts';
import * as Chart from 'react-apexcharts';
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
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut' as ApexChart['type'],
    },
    theme: {
      palette: 'palette1',
    },
    colors: CHART_COLORS.primary,
    labels: data.map((item) => item.name),
    tooltip: {
      custom: ({ series, seriesIndex }) =>
        '<div style="padding:8px; background-color: #171919; color: #fff; ">' +
        '<span>' +
        series[seriesIndex] +
        ' :' +
        'API نام' +
        '</span>' +
        '</div>',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: -8,
            },
            value: {
              show: true,
              offsetY: 2,
            },
            total: {
              show: !!total?.value,
              showAlways: true,
              label: total?.label,
              fontSize: '16px',
              fontWeight: '500',
              formatter: () => String(total?.value).toLocaleString(),
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

  return (
    <div className="max-w-[398px] gap-x-6 gap-y-4">
      {title ? (
        <h2 className="mb-6 text-center text-h4 font-medium text-[#322D73]">
          {title}
        </h2>
      ) : null}
      <div
        className="relative mx-auto flex w-full max-w-md items-center
          justify-center"
      >
        <Chart.default
          options={chartOptions}
          series={series}
          type="donut"
          height={272}
        />
        {total?.suffix ? (
          <div
            className="absolute left-1/2 top-[52%] -translate-x-1/2 translate-y-4
            text-h5 font-medium text-grey-main"
          >
            {total.suffix}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex w-full items-center justify-center gap-4">
        {showLegends &&
          data.map((item, index) => (
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
    </div>
  );
};

export default DonutChart;
