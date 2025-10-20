import { HintBadgeProps } from './interface';
import { AlertTriangle, CheckCheck } from 'lucide-react';
import { Meta, StoryObj } from '@storybook/react';
import HintBadge from './hint-badge';

const meta: Meta<typeof HintBadge> = {
  title: 'Badges/HintBadge',
  component: HintBadge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<HintBadgeProps>;

export const Default: Story = {
  args: {
    icon: (
      <AlertTriangle className="size-4 text-orange-500" strokeWidth={1.5} />
    ),
    title: 'Warning',
    title_color: 'text-orange-500',
    bg_color: 'bg-orange-100',
  },
};

export const Success: Story = {
  args: {
    icon: <CheckCheck className="size-4 text-green-600" strokeWidth={2} />,
    title: 'Verified',
    title_color: 'text-green-600',
    bg_color: 'bg-green-100',
  },
};
