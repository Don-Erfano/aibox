import { Meta, StoryObj } from '@storybook/react';
import { NoDataProps } from './interface';
import NoData from './no-data';
import { Button } from '../form';
import { NoDataIcon } from '../icons';

const meta: Meta<typeof NoData> = {
  title: 'General/NoData',
  component: NoData,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<NoDataProps & { children?: React.ReactNode }>;

export const Default: Story = {
  args: {},
};
export const DefaultWithDescription: Story = {
  args: {
    title: 'موردی یافت نشد.',
    description: 'لطفاً تنظیمات جستجو را تغییر دهید یا آیتم جدیدی اضافه کنید.',
  },
};
export const DefaultWithDescriptionAndChildren: Story = {
  args: {
    title: 'موردی یافت نشد.',
    description: 'لطفاً تنظیمات جستجو را تغییر دهید یا آیتم جدیدی اضافه کنید.',
    children: <Button variant="default">افزودن آیتم</Button>,
  },
};

export const CustomIconAndTitle: Story = {
  args: {
    icon: <NoDataIcon />,
    title: 'هیچ داده‌ای موجود نیست',
    description: 'برای شروع، آیتم جدیدی اضافه کنید.',
    children: (
      <div className="flex gap-5">
        <Button variant="outline">ایجاد آیتم</Button>
        <Button variant="outline">ایجاد آیتم</Button>
      </div>
    ),
  },
};
