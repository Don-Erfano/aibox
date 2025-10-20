import type { Meta, StoryObj } from '@storybook/react';
import { SingleDatePicker } from './single-date-picker';

const meta: Meta<typeof SingleDatePicker> = {
  component: SingleDatePicker,
  title: 'form/SingleDatePicker',
};
export default meta;
type Story = StoryObj<typeof SingleDatePicker>;

export const General: Story = {
  args: {
    onChange: (e) => console.log(e),
  },
};
