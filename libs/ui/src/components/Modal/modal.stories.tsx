import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../ui/button';
import { ModalProps, useModal } from './modal';
import { Mail } from 'lucide-react';

const ModalPreview = (props: ModalProps) => {
  const { Modal, open, setOpen } = useModal();

  return (
    <>
      <Button onClick={() => setOpen(!open)}>Open Modal</Button>
      <Modal {...props}>
        <p>This is the modal content. You can place anything here.</p>
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
