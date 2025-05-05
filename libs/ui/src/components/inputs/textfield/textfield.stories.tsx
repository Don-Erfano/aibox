import type { Meta, StoryObj } from '@storybook/react';
import { Textfield } from './Textfield';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
  title: 'textfield',
};
export default meta;
type Story = StoryObj<typeof Textfield>;

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
