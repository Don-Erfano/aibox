import { Meta, StoryObj } from '@storybook/react';
import { Mail } from 'lucide-react';

import { Button } from '../buttons';
import { ModalProps } from './interface';
import useModal from './Modal';

const ModalPreview = (props: ModalProps) => {
  const { Modal, setOpen } = useModal();

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...props}>
        <p>می‌توانید محتوای خود را در این بخش قرار دهید.</p>
      </Modal>
    </>
  );
};

const meta: Meta<typeof ModalPreview> = {
  title: 'Modal',
  component: ModalPreview,
};

export default meta;

type Story = StoryObj<typeof ModalPreview>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    headerIcon: <Mail className="size-24" />,
  },
};
