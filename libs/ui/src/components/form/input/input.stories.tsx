import type { Meta, StoryObj } from '@storybook/react';
import { BaseTextField } from './aib-input';

const meta: Meta<typeof BaseTextField> = {
  component: BaseTextField,
  title: 'Input',
};
export default meta;
type Story = StoryObj<typeof BaseTextField>;

export const Sm: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <>start</>,
    endAdornment: <>end</>,
    disabled: false,
    readOnly: false,
  },
};

export const md: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <>start</>,
    endAdornment: <>end</>,
  },
};

export const lg: Story = {
  args: {
    placeholder: 'placeholder',
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
  },
};
