import type { Meta, StoryObj } from '@storybook/react';
import SemiCircleChart from './semi-circle-chart';

const meta: Meta<typeof SemiCircleChart> = {
  component: SemiCircleChart,
  title: 'charts/SemiCircleChart',
};
export default meta;
type Story = StoryObj<typeof SemiCircleChart>;

export const General: Story = {
  args: {
    data: -50,
    label: '50%-',
  },
};
