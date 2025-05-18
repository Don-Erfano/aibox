import { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'Radio Group',
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Preview: Story = {
  args: {
    value: 'user',
    items: [
      { value: 'user', id: 'userid', label: 'کاربر' },
      { value: 'admin', id: 'adminid', label: 'ادمین' },
      { value: 'operator', id: 'operatorid', label: 'اپراتور' },
    ],
    isDisabled: true,
  },
};
