import { Search } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import { AIBInput } from './input';

const meta: Meta<typeof AIBInput> = {
  component: AIBInput,
  title: 'form/Input',
};
export default meta;
type Story = StoryObj<typeof AIBInput>;

export const Sm: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <Search />,
    endAdornment: <Search />,
    disabled: false,
    variant: 'sm',
    'aria-readonly': false,
  },
};

export const Md: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <Search />,
    variant: 'md',
    endAdornment: <Search />,
    type: 'password',
    disabled: true,
  },
};

export const Lg: Story = {
  args: {
    variant: 'lg',
    placeholder: 'placeholder',
    startAdornment: <Search />,
    endAdornment: <Search />,
  },
};
