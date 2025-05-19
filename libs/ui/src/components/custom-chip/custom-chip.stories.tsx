import type { Meta, StoryObj } from '@storybook/react';

import { CustomChip } from './custom-chip';

const meta: Meta<typeof CustomChip> = {
  component: CustomChip,
  title: 'CustomChip',
};
export default meta;
type Story = StoryObj<typeof CustomChip>;

export const Default: Story = {
  args: {
    label: 'متن چیپ',
    onIconClick: () => console.log('clicked'),
  },
};
