import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
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
} as ComponentMeta<typeof Select>;

const baseOptions: SelectOption[] = [
  { value: 'apple', label: 'apple' },
  { value: 'banana', label: 'banana' },
  { value: 'orange', label: 'orange' },
];

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...(args as SelectProps)} />
);

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

export const Controlled: ComponentStory<typeof Select> = () => {
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
