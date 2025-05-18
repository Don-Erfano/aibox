export interface RadioItem {
  value: string;
  id: string;
  label: string;
}

export interface RadioGroupProps {
  defaultValue: string;
  value: string;
  onValueChange?: (val: string) => void;
  items: RadioItem[];
  isDisabled?: boolean;
}
