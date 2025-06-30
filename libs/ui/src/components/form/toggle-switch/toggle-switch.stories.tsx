import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ToggleSwitch } from './toggle-switch';
import { ToggleSwitchProps } from './interface';

const ToggleSwitchStory = (props: ToggleSwitchProps) => {
  const { variant, size, readonly, disabled } = props;
  const [value, setValue] = useState('first');

  return (
    <ToggleSwitch
      items={[
        { label: 'لیبل با متن طولانی', value: 'first' },
        { label: 'غیرفعال', value: 'second' },
      ]}
      value={value}
      onValueChange={setValue}
      variant={variant}
      disabled={disabled}
      readonly={readonly}
      size={size}
    />
  );
};

const meta: Meta<typeof ToggleSwitchStory> = {
  component: ToggleSwitchStory,
  title: 'ToggleSwitch',
};

export default meta;

type Story = StoryObj<typeof ToggleSwitchStory>;

export const General: Story = {
  args: {
    variant: 'default',
    size: 'auto',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['onOff', 'default'],
    },
    size: {
      control: { type: 'select' },
      options: ['fixed', 'auto'],
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
  },
};
