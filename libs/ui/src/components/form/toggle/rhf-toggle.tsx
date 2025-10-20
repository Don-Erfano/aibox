"use client";

import { FieldValues } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { RHFToggleProps } from "./interface";
import Toggle from "./toggle";

const RHFToggle = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  size = "fixed",
  ...props
}: RHFToggleProps<TFieldValues>) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel aria-disabled={props.disabled}>{label}</FormLabel>}
        <FormControl>
          <Toggle
            {...props}
            {...field}
            variant="primary"
            value={field.value}
            onValueChange={field.onChange}
            size={size}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default RHFToggle;
