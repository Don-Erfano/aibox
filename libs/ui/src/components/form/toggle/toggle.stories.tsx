import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ToggleProps } from './interface';
import Toggle from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    size: {
      control: { type: 'radio' },
      options: ['auto', 'fixed'],
    },
    onValueChange: { action: 'value changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

const items = [
  { value: 'hourly', label: 'ساعتی' },
  { value: 'yearly', label: 'ماهانه' },
  { value: 'both', label: 'هردو' },
];

const StatefulToggle = (props: ToggleProps) => {
  const [value, setValue] = useState(props.value || items[0].value);
  return <Toggle {...props} value={value} onValueChange={setValue} />;
};

export const Primary: Story = {
  render: (args) => <StatefulToggle {...args} />,
  args: {
    variant: 'primary',
    size: 'auto',
    items,
  },
};

export const Secondary: Story = {
  render: (args) => <StatefulToggle {...args} />,
  args: {
    variant: 'secondary',
    size: 'auto',
    items,
  },
};

export const OnOffMode: Story = {
  render: (args) => <StatefulToggle {...args} />,
  args: {
    variant: 'primary',
    onOff: true,
    size: 'auto',
    items: [
      { value: 'hourly', label: 'ساعتی' },
      { value: 'yearly', label: 'ماهانه' },
    ],
  },
};

export const Disabled: Story = {
  render: (args) => <StatefulToggle {...args} />,
  args: {
    variant: 'primary',
    size: 'auto',
    disabled: true,
    items,
  },
};

export const Readonly: Story = {
  render: (args) => <StatefulToggle {...args} />,
  args: {
    variant: 'primary',
    size: 'auto',
    readonly: true,
    items,
  },
};
