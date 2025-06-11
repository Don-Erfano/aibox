import { NuqsAdapter } from 'nuqs/adapters/react';
import type { Meta, StoryObj } from '@storybook/react';
import Tab from './tab';

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: 'Tab',
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Preview: Story = {
  args: {
    tabs: [
      {
        name: 'مشخصات کاربری',
        id: '1',
        content: <p>test1</p>,
        isDisabled: false,
      },
      {
        name: 'بسته‌های API',
        id: '2 ',
        content: <p>test2</p>,
        isDisabled: false,
      },
      {
        name: 'بسته‌های GPU',
        id: '3',
        content: <p>test3</p>,
        isDisabled: false,
      },
      {
        name: 'APIهای ارائه شده',
        id: '4',
        content: <p>test4</p>,
        isDisabled: false,
      },
      { name: 'تنظیمات', id: '5', content: 'test', isDisabled: false },
      { name: 'توکن', id: '6', content: 'test22', isDisabled: true },
    ],
  },
  decorators: [
    (Story) => (
      <NuqsAdapter>
        <Story />
      </NuqsAdapter>
    ),
  ],
};
