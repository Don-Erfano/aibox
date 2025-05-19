export interface RadioItem {
  value: string;
  id: string;
  label: string;
}

export interface RadioGroupProps<T> {
  defaultValue: string;
  value: string;
  onValueChange?: (val: T) => void;
  items: RadioItem[];
  isDisabled?: boolean;
}
