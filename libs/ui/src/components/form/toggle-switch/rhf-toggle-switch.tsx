'use client';

import { FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './../form';
import { RHFToggleSwitchProps } from './interface';
import { ToggleSwitch } from './toggle-switch';

export const RHFToggleSwitch = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  ...props
}: RHFToggleSwitchProps<TFieldValues>) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <ToggleSwitch
            {...field}
            {...props}
            onValueChange={field.onChange}
            value={field.value}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
