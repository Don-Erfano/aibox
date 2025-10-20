import type { Meta, StoryObj } from '@storybook/react';
import { RangeDatePicker } from './range-date-picker';

const meta: Meta<typeof RangeDatePicker> = {
  component: RangeDatePicker,
  title: 'form/rangedatepicker',
};
export default meta;
type Story = StoryObj<typeof RangeDatePicker>;

export const General: Story = {
  args: {
    onChange: (e) => console.log(e),
  },
};
