import type { Meta, StoryObj } from '@storybook/react';

import MessageBox from './message-box';

const meta: Meta<typeof MessageBox> = {
  component: MessageBox,
  title: 'MessageBox',
};

export default meta;

type Story = StoryObj<typeof MessageBox>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'boolean',
    },
  },
  args: {
    children: (
      <div className="flex flex-col items-center gap-1">
        <span className="text-center text-xs">اتمام زمان</span>
        <span className="text-center text-xs">1404/06/29 13:32</span>
      </div>
    ),
  },
};
