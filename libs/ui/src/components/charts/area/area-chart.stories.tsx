import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from 'lucide-react';

const meta: Meta<typeof AreaChart> = {
  component: AreaChart,
  title: 'charts/AreaChart',
};
export default meta;
type Story = StoryObj<typeof AreaChart>;

// const AreaChartData = [
//   { x: '01/02/25', y: '100' },
//   { x: '01/02/26', y: '280' },
//   { x: '01/02/27', y: '450' },
//   { x: '01/02/28', y: '320' },
//   { x: '01/02/29', y: '380' },
//   { x: '01/02/30', y: '250' },
//   { x: '01/03/31', y: '605' },
// ];
export const General: Story = {
  args: {
    // data: AreaChartData,
    // title: 'کاربران جدید',
    height: 300,
  },
};
