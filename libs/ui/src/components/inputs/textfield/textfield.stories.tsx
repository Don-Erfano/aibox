import type { Meta, StoryObj } from '@storybook/react';
import { BaseTextField } from './BaseTextField';

const meta: Meta<typeof BaseTextField> = {
  component: BaseTextField,
  title: 'BaseTextField',
};
export default meta;
type Story = StoryObj<typeof BaseTextField>;

export const Dense: Story = {
  args: {
    placeholder: 'placeholder',
    startAdornment: <>start</>,
    endAdornment: <>end</>,
    variant: 'dense',
    error: undefined,
  },
};

export const Bulk: Story = {
  args: {
    placeholder: 'placeholder',
    error: undefined,
    variant: 'bulk',
    startAdornment: <>start</>,
    endAdornment: <>end</>,
  },
};
