import { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './interface';
import ProfileBox from './profile-box';

const defaultItems: MenuItem[] = [
  { label: 'پروفایل', href: '/profile' },
  { label: 'خروج از حساب کاربری', href: '/logout' },
  { label: 'تیکت‌ها', href: '/tickets' },
  { label: 'تنظیمات', href: '/settings' },
];

const extraItems: MenuItem[] = [
  ...defaultItems,
  { label: 'راهنما', href: '/help' },
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

export const FiveItems: Story = {
  args: {
    username: 'عرفان میربابایی erfan mirbabaei',
    items: extraItems,
  },
};
