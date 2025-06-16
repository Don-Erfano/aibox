import type { Meta, StoryObj } from '@storybook/react';
import DonutChart from './donut-chart';

const meta: Meta<typeof DonutChart> = {
  component: DonutChart,
  title: 'charts/DonutChart',
};
export default meta;
type Story = StoryObj<typeof DonutChart>;

const chartData = [
  { id: '1', name: 'نام API', amount: 35000000 },
  { id: '2', name: 'نام API', amount: 35000000 },
  { id: '3', name: 'نام API', amount: 26000000 },
  { id: '4', name: 'نام API', amount: 30000000 },
];
export const General: Story = {
  args: {
    data: chartData,
  },
};

export const WithTotal: Story = {
  args: {
    data: chartData,
    total: {
      value: 100,
      label: 'مجموع',
      suffix: 'درصد رشد',
    },
  },
};
