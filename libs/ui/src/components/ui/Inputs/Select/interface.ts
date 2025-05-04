export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  placeholder?: string;
  error?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'default';
  disabled?: boolean;
}
