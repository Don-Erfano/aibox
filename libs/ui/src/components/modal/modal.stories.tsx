import { Meta, StoryObj } from '@storybook/react';
import { Mail } from 'lucide-react';

import { Modal } from './modal';
import { Button } from '../form';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const General: Story = {
  args: {
    title: 'عنوان مدال',
    trigger: <Button>Open Modal</Button>,
    headerIcon: (
      <Mail className="bg-slate-400 w-[220px] h-[168px] rounded-sm" />
    ),
    children: <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>,
  },
};
