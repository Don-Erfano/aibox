import { CSSProperties, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Select from './Select';
import { SelectOption, SelectProps } from './interface';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'default'],
    },
    error: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} as Meta<SelectProps>;

const baseOptions: SelectOption[] = [
  { value: 'apple', label: 'apple' },
  { value: 'banana', label: 'banana' },
  { value: 'orange', label: 'orange' },
];

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: baseOptions,
  placeholder: 'Pick a fruit…',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  ...Default.args,
  defaultValue: 'banana',
};

export const Controlled = () => {
  const [value, setValue] = useState<string>('apple');
  return (
    <Select
      options={baseOptions}
      value={value}
      onValueChange={setValue}
      placeholder="Controlled…"
    />
  );
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'sm',
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Default.args,
  readOnly: true,
  defaultValue: 'orange',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

/**
 * Now two theme‐wrapped stories:
 * - UserTheme uses blue borders
 * - AdminTheme uses green borders
 */
export const UserTheme = Template.bind({});
UserTheme.args = { ...Default.args };
UserTheme.decorators = [
  (Story) => (
    <div
      style={
        {
          '--select-border-color': '#3b92f6',
          '--select-focus-border-color': '#2563eb',
        } as CSSProperties
      }
    >
      <Story />
    </div>
  ),
];

export const AdminTheme = Template.bind({});
AdminTheme.args = { ...Default.args };
AdminTheme.decorators = [
  (Story) => (
    <div
      style={
        {
          '--select-border-color': '#10b981',
          '--select-focus-border-color': '#059669',
        } as CSSProperties
      }
    >
      <Story />
    </div>
  ),
];
