"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../form";
import { Checkbox } from "./checkbox";
import { RHFCheckboxProps } from "./interface";
import { FieldValues } from "react-hook-form";

export const RHFCheckbox = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  disabled,
}: RHFCheckboxProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="flex flex-row items-center">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel aria-disabled={disabled} className="text-sm">
              {label}
            </FormLabel>
            {!error && description && (
              <FormDescription>{description}</FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};
