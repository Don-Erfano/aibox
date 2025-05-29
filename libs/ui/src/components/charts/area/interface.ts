interface DataPoint {
  x: string;
  y: number;
}

interface IChartProps {
  className?: string;
  data: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  title?: string;
  height?: number;
  lineColor?: string;
  fillColor?: string;
  enableTooltip?: boolean;
  horizontalCategories?: string[];
}

type TSeriesData = ApexAxisChartSeries;

export type { IChartProps, DataPoint, TSeriesData };
