import { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './interface';
import { ProfileBox } from './index';

const defaultItems: MenuItem[] = [
  { label: 'پروفایل' },
  { label: 'خروج از حساب کاربری' },
];

const meta: Meta<typeof ProfileBox> = {
  title: 'Components/ProfileBox',
  component: ProfileBox,
  argTypes: {
    username: { control: 'text' },
    avatarUrl: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ProfileBox>;

export const FourItems: Story = {
  args: {
    username: 'عرفان میربابایی erfan mirbabaei',
    items: defaultItems,
  },
};
