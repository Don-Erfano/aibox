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
    'aria-readonly': false,
  },
};

export const md: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <Search />,
    endAdornment: <Search />,
    'aria-readonly': false,
  },
};

export const lg: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <Search />,
    endAdornment: <Search />,
  },
};
