import type { Meta, StoryObj } from '@storybook/react';
import DatePicker from './DatePicker';
import { DatePickerForm } from './rhf-date-picker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const General: Story = {
  args: {
    onChange: (e) => console.log(e),
  },
};
export const Range: Story = {
  args: {
    isMulti: true,
    onChange: (e) => console.log(e),
  },
};

export const Rhf: Story = {
  args: {},
  decorators: () => <DatePickerForm />,
};
