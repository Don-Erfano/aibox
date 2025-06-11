'use client';

import { FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '../form';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { RHFRadioGroupProps } from './interface';

export const RHFRadioGroup = <
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues>
>({
  control,
  name,
  label,
  description,
  options,
  className,
  disabled,
}: RHFRadioGroupProps<TFieldValues, Name>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-3">
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <RadioGroup
              {...field}
              className={className}
              onValueChange={field.onChange}
              value={field.value as string}
              disabled={disabled}
            >
              {options.map(({ id, label: optionLabel }) => (
                <FormItem
                  key={String(id)}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={id} id={id} disabled={disabled} />
                  </FormControl>
                  <FormLabel
                    className="font-normal text-sm leading-6 text-zinc-600"
                    htmlFor={id}
                  >
                    {optionLabel}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
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
