import { Control, FieldValues, Path } from 'react-hook-form';

export interface ToggleSwitchProps {
  items: [{ label: string; value: string }, { label: string; value: string }];
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
