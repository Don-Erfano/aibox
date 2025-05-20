import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Control, FieldValues, Path } from 'react-hook-form';

type RadioItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>;

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;

export interface RadioOption<
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues>
> {
  id: TFieldValues[Name];
  label: string;
}

interface RHFRadioGroupProps<
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues>
> extends Omit<RadioGroupProps, 'name'> {
  control: Control<TFieldValues>;
  name: Name;
  label?: string;
  description?: string;
  options: Array<RadioOption<TFieldValues, Name>>;
  disabled?: boolean;
}

export type { RadioGroupProps, RHFRadioGroupProps, RadioItemProps };
