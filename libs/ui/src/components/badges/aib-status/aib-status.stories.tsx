import { Meta, StoryObj } from '@storybook/react';
import { AibStatus } from './index';

const meta: Meta<typeof AibStatus> = {
  title: 'Boxes/AibStatus',
  component: AibStatus,
  argTypes: {
    label: {},
    bgColor: {},
  },
};

export default meta;

type Story = StoryObj<typeof AibStatus>;

export const Active: Story = {
  args: {
    label: 'aib status',
    bgColor: 'bg-teal-600 text-green-600',
  },
};
