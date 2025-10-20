"use client";

import { FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../form";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { RHFRadioGroupProps } from "./interface";
import clsx from "clsx";

export const RHFRadioGroup = <
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  options,
  className,
  disabled,
  variant = "vertical",
}: RHFRadioGroupProps<TFieldValues, Name>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          {label && <FormLabel aria-disabled={disabled}>{label}</FormLabel>}

          <FormControl>
            <RadioGroup
              {...field}
              className={className}
              onValueChange={field.onChange}
              value={field.value as string}
              disabled={disabled}
              variant={variant}
            >
              {options.map(({ id, label: optionLabel }) => (
                <FormItem
                  key={String(id)}
                  className="flex h-4 items-center gap-2"
                >
                  <FormControl>
                    <RadioGroupItem value={id} id={id} disabled={disabled} />
                  </FormControl>
                  <FormLabel
                    className={clsx("text-sm font-normal text-zinc-600", {
                      "text-gray-400": disabled,
                    })}
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
