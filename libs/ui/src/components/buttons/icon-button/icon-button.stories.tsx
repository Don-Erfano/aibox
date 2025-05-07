import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './icon-button';
import { ChevronDown } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'IconButton',
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const General: Story = {
  args: {
    children: <ChevronDown />,
    'aria-selected': false,
    disabled: false,
  },
};
