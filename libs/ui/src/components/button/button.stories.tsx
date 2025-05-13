import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const General: Story = {
  args: {
    children: 'ChevronDown',
    variant: 'default',
    size: 'default',
    'aria-selected': false,
    isFilled: true,
    disabled: false,
  },
};

export const Error: Story = {
  args: {
    children: 'ChevronDown',
    variant: 'destructive',
    size: 'sm',
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    children: 'ChevronDown',
    variant: 'outline',
    size: 'sm',
    isFilled: false,
    disabled: false,
  },
};
