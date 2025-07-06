import { Control, FieldValues, Path } from 'react-hook-form';

interface SwitchItem {
  label: string;
  value: string;
}

export type ToggleSwitchItems = [SwitchItem, SwitchItem];

export interface ToggleSwitchProps {
  items: ToggleSwitchItems;
  value: string;
  onValueChange: (value: string) => void;
  size?: 'fixed' | 'auto';
  variant?: 'default' | 'onOff';
  readonly?: boolean;
  disabled?: boolean;
}

export interface RHFToggleSwitchProps<TFieldValues extends FieldValues>
  extends Omit<ToggleSwitchProps, 'value' | 'onValueChange'> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
}
