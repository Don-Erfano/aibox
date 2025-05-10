import type { Meta, StoryObj } from '@storybook/react';

import { TableToolbar } from './TableToolbar';

const meta: Meta<typeof TableToolbar> = {
  component: TableToolbar,
  title: 'TableToolbar',
};

export default meta;

type Story = StoryObj<typeof TableToolbar>;

export const Default: Story = {
  args: {
    title: 'نام جدول',
    totalItems: 25,
    hideActiveButtons: false,
    hideActions: [],
  },
};
