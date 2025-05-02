import type { Meta, StoryObj } from '@storybook/react';
import { CirclePlus } from 'lucide-react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const GeneralButton: Story = {
  args: {
    title: 'متن دکمه',
    variant: 'general',
    size: 'default',
    isFilled: false,
    'aria-selected': false,
    disabled: false,
    loading: false,
    icon: <CirclePlus />,
    iconPlacement: 'end',
  },
};

export const FormButton: Story = {
  args: {
    title: 'متن دکمه',
    variant: 'form',
    isFilled: true,
    disabled: false,
    loading: false,
    icon: <CirclePlus />,
    iconPlacement: 'end',
  },
};

export const TextButton: Story = {
  args: {
    title: 'متن دکمه',
    variant: 'text',
    disabled: false,
    loading: false,
    icon: <CirclePlus />,
    iconPlacement: 'start',
  },
};

export const IconButton: Story = {
  args: {
    title: 'متن دکمه',
    variant: 'icon',
    disabled: false,
    loading: false,
    'aria-selected': false,
    'data-activated': false,
    icon: <CirclePlus />,
  },
};

export const WarningButton: Story = {
  args: {
    title: 'متن دکمه',
    variant: 'warning',
    disabled: false,
    loading: false,
  },
};
