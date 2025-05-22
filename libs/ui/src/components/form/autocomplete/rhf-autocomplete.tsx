'use client';

import { FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './../form';
import { AIBAutocomplete } from './aib-autocomplete';
import { RHFAutocompleteProps } from './interface';

export const RHFAutocomplete = <TFieldValues extends FieldValues>({
  name,
  options,
  label,
  control,
  description,
}: RHFAutocompleteProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="flex flex-col">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>

          <FormControl>
            <AIBAutocomplete options={options} />
          </FormControl>

          {!error && description && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
