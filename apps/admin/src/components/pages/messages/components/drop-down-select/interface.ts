export interface Option {
  value: string;
  label: string;
}

export interface DropDownSelectProps {
  options: Option[];
  value?: string;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerSize?: string;
}
