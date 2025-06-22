'use client';

import { FieldValues } from 'react-hook-form';

import CustomDatePicker from './DatePicker';
import { IRhfDatePicker } from './types';
import { FormField, FormItem, FormLabel, FormMessage } from '../form';

export const RhfDatePicker = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  isMulti,
}: IRhfDatePicker<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <CustomDatePicker
            label=""
            onChange={field.onChange}
            value={field.value}
            isMulti={isMulti}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
