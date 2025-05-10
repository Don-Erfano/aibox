import { Meta, StoryObj } from '@storybook/react';
import { StatusBox } from './index';

const meta: Meta<typeof StatusBox> = {
  title: 'Boxes/StatusBox',
  component: StatusBox,
  argTypes: {
    isActive: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof StatusBox>;

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const Inactive: Story = {
  args: {
    isActive: false,
  },
};
