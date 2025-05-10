import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Mail } from 'lucide-react';
import { Button } from '../button';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    trigger: <Button>Open Modal</Button>,
    headerIcon: <Mail className="size-24" />,
    children: <p>This is the modal content. You can place anything here.</p>,
  },
};
