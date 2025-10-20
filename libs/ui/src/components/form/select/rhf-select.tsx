import { FieldValues } from "react-hook-form";
import { RhfSelectProps } from "./interface";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Select } from "./aib-select";

export const RHFSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  ...props
}: RhfSelectProps<TFieldValues>) => (
  <FormField
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Select {...field} {...props} />
        </FormControl>
        {!error && description && (
          <FormDescription>{description}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);
