import { Meta, StoryObj } from '@storybook/react';
import AibAutocomplete from './aib-autocomplete';
import { AutocompleteOption } from './interface';
import { DeleteIcon, LoaderCircle } from 'lucide-react';

const meta = {
  title: 'Inputs/AutoCompleteInput',
  component: AibAutocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    mode: {
      control: 'radio',
      options: ['dark', 'light'],
    },
    options: { control: 'object' },
    onSelect: { action: 'selected' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    tagAdornment: {
      control: 'select',
      mapping: {
        None: undefined,
        DeleteIcon: <DeleteIcon size={16} />,
        Loader: <LoaderCircle size={16} />,
      },
    },
    limited_tag: {
      name: 'tag limit',
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
    isLoading: { control: 'boolean' },
    h_size: {
      name: 'size',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    hint_txt: { name: 'hint text', control: 'text' },
  },
} satisfies Meta<typeof AibAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleSelect = (
  selectedOptions: AutocompleteOption | AutocompleteOption[]
) => {
  console.log('Selected option(s):', selectedOptions);
};

const handleChange = (value: string) => {
  console.log('Input value changed:', value);
};

const commonArgs = {
  options: [
    { id: 1, label: 'رستوران' },
    { id: 2, label: 'کافه ' },
    { id: 3, label: 'تفریحی' },
    { id: 4, label: 'شهر بازی' },
    { id: 5, label: 'کنسرت' },
  ],
  onSelect: handleSelect,
  onChange: handleChange,
  label: 'دسته‌بندی',
  disabled: false,
  placeholder: 'دسته‌بندی...',
  tagAdornment: undefined,
  limited_tag: undefined,
  isLoading: false,
  h_size: 'md',
  hint_txt: '',
};

export const Single: Story = {
  args: {
    ...commonArgs,
    variant: 'single',
    value: '',
    mode: 'dark',
  },
};

export const Multiple: Story = {
  args: {
    ...commonArgs,
    variant: 'multiple',
    value: [],
    mode: 'light',
  },
};

export const Loading: Story = {
  args: {
    ...commonArgs,
    variant: 'single',
    isLoading: true,
    mode: 'light',
  },
};

export const WithTagLimit: Story = {
  args: {
    ...commonArgs,
    variant: 'multiple',
    limited_tag: 2,
    hint_txt: 'You can select up to 2 items',
    mode: 'light',
  },
};

export const WithAdornment: Story = {
  args: {
    ...commonArgs,
    variant: 'multiple',
    tagAdornment: <DeleteIcon size={16} />,
    mode: 'light',
  },
};
