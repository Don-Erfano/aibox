import type { Meta, StoryObj } from '@storybook/react';
import { FakeLoadingProps } from './interface';
import FakeLoading from './fake-loading';

const meta: Meta<typeof FakeLoading> = {
  title: 'Loaders/FakeLoading',
  component: FakeLoading,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<FakeLoadingProps>;

export const Default: Story = {
  args: {
    message: 'سرور شما در حال آماده‌سازی می‌باشد...',
  },
};
