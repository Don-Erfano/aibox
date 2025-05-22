'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../form';
import { Checkbox } from './checkbox';
import { RHFCheckboxProps } from './interface';
import { FieldValues } from 'react-hook-form';

export const RHFCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
}: RHFCheckboxProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {!error && description && (
              <FormDescription>{description}</FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};
