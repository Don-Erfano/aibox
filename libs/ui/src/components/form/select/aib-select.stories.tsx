import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SelectOption, SelectProps } from './interface';
import { AibSelect } from './index';

export default {
  title: 'Inputs/Select',
  component: AibSelect,
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'default'],
    },
    error: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text', description: 'Optional helper / hint text' },
  },
} as ComponentMeta<typeof AibSelect>;

const baseOptions: SelectOption[] = [
  { value: 'fruit1', label: 'میوه1' },
  { value: 'fruit2', label: 'میوه2' },
  { value: 'fruit3', label: 'میوه3' },
];

const Template: ComponentStory<typeof AibSelect> = (args) => (
  <AibSelect {...(args as SelectProps)} />
);

export const Default = Template.bind({});
Default.args = {
  options: baseOptions,
  placeholder: 'یه چیزی...',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  ...Default.args,
  helperText: 'متن راهنما برای کاربر',
};

export const ErrorWithHelper = Template.bind({});
ErrorWithHelper.args = {
  ...Default.args,
  error: true,
  helperText: 'لطفاً یک گزینه معتبر انتخاب کنید',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  ...Default.args,
  defaultValue: 'fruit2',
};

export const Controlled: ComponentStory<typeof AibSelect> = () => {
  const [value, setValue] = useState<string>('fruit1');
  return (
    <AibSelect
      options={baseOptions}
      value={value}
      onValueChange={setValue}
      placeholder="Controlled…"
      helperText="راهنما"
    />
  );
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
  size: 'sm',
  helperText: 'راهنما',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Default.args,
  readOnly: true,
  defaultValue: 'fruit3',
  helperText: 'این فیلد فقط خواندنی است',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  helperText: 'در حال حاضر غیرفعال است',
};
