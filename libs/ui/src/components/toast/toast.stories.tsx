import type { Meta, StoryObj } from '@storybook/react';

import type { CustomToastOptions, ToastPlaygroundProps } from './interface';
import { toast, ToastContainer } from './toast';

const ToastPlayground = ({
  type,
  message,
  description,
  showCloseButton,
  withAction,
  autoClose,
}: ToastPlaygroundProps) => {
  const onClick = () => {
    const options: CustomToastOptions = {
      description,
      showCloseButton,
      autoClose,
    };

    if (withAction) {
      options.action = {
        label: 'تلاش مجدد',
        onClick: () => console.log('Action Clicked'),
      };
    }

    toast[type](message, options);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <button onClick={onClick}>Show Toast</button>
    </div>
  );
};

const meta: Meta<typeof ToastPlayground> = {
  title: 'Toast',
  component: ToastPlayground,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'info', 'warning', 'loading'],
    },
    message: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    showCloseButton: {
      control: 'boolean',
    },
    withAction: {
      control: 'boolean',
    },
    autoClose: {
      control: 'number',
    },
  },
  args: {
    type: 'success',
    message: 'عملیات با موفقیت انجام شد.',
    description: 'همه اطلاعات مورد نظر ثبت شدند.',
    showCloseButton: true,
    withAction: false,
    autoClose: 5000,
  },
};

export default meta;
type Story = StoryObj<typeof ToastPlayground>;

export const Playground: Story = {
  render: (args) => <ToastPlayground {...args} />,
};
