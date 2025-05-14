import type { Meta, StoryObj } from '@storybook/react';
import { BaseTextField } from './BaseTextField';

const meta: Meta<typeof BaseTextField> = {
  component: BaseTextField,
  title: 'BaseTextField',
};
export default meta;
type Story = StoryObj<typeof BaseTextField>;

export const Sm: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <>start</>,
    endAdornment: <>end</>,
    variant: 'sm',
    error: undefined,
    disabled: false,
    readOnly: false,
  },
};

export const md: Story = {
  args: {
    placeholder: 'placeholder',
    error: undefined,
    variant: 'md',
    startAdornment: <>start</>,
    endAdornment: <>end</>,
  },
};

export const lg: Story = {
  args: {
    placeholder: 'placeholder',
    error: undefined,
    variant: 'lg',
    startAdornment: <>start</>,
    endAdornment: <>end</>,
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <>start</>,
    label: 'label',
    endAdornment: <>end</>,
    variant: 'md',
    error: undefined,
  },
};
