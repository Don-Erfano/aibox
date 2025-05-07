import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const General: Story = {
  args: {
    children: 'children',
    variant: 'general',
    filled: false,
    fullWidth: false,
  },
};

export const Error: Story = {
  args: {
    children: 'children',
    variant: 'form',
    error: true,
  },
};

export const Form: Story = {
  args: {
    children: 'children',
    variant: 'form',
    filled: false,
    fullWidth: false,
  },
};
