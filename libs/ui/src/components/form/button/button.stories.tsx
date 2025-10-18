import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';
import { FilterIcon, Info } from 'lucide-react';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const General: Story = {
  args: {
    children: 'ChevronDown',
    variant: 'default',
    size: 'default',
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

export const Icon: Story = {
  args: {
    children: <FilterIcon />,
    variant: 'ghost',
    size: 'icon',
    'aria-selected': false,
    disabled: false,
  },
};

export const ToolTip: Story = {
  args: {
    children: <Info strokeWidth={1.5} />,
    variant: 'ghost',
    size: 'icon',
    tooltip: '-برای وارد کردن git url از  http://git_url/branch استفاده کنید.',
    'aria-selected': false,
    disabled: false,
    className:
      'hover:bg-transparent  !p-0  !m-2 hover:!p-0 hover:!m-2 size-6 hover:text-red-500 hover:text-neutral-900 text-neutral-500',
  },
};

export const Text: Story = {
  args: {
    children: 'text button',
    variant: 'link',
    size: 'sm',
    'aria-selected': false,
    disabled: false,
  },
};
