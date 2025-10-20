import type { Meta, StoryObj } from '@storybook/react';

import SelectChip from './select-chip';

const meta: Meta<typeof SelectChip> = {
  component: SelectChip,
  title: 'Select Chip',
};

export default meta;

type Story = StoryObj<typeof SelectChip>;

export const Default: Story = {
  args: {
    children: 'متن تگ',
  },
};
