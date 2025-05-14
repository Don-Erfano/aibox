import type { Meta, StoryObj } from '@storybook/react';
import { TableToolbar } from './table-toolbar';

const meta: Meta<typeof TableToolbar> = {
  component: TableToolbar,
  title: 'TableToolbar',
};
export default meta;
type Story = StoryObj<typeof TableToolbar>;

export const General: Story = {
  args: {
    title: 'نام جدول',
    totalItems: 24,
    viewModeButtons: true,
    filterCount: 15,
    reorderedColumnCount:2
  },
};
