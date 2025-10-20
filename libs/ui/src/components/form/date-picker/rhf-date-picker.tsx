import { FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { TRhfDatePicker } from "./interface";
import { RangeDatePicker } from "./range-date-picker";
import { SingleDatePicker } from "./single-date-picker";

export const RhfDatePicker = <TFieldValues extends FieldValues>({
  mode,
  name,
  control,
  description,
  label,
  disabled,
  readOnly,
}: TRhfDatePicker<TFieldValues>) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
        <FormItem>
          {label && <FormLabel aria-disabled={disabled}>{label}</FormLabel>}
          <FormControl>
            {mode === "range" ? (
              <RangeDatePicker
                onChange={onChange}
                {...rest}
                error={!!error}
                disabled={disabled}
                readOnly={readOnly}
              />
            ) : (
              <SingleDatePicker
                onChange={onChange}
                {...rest}
                error={!!error}
                disabled={disabled}
                readOnly={readOnly}
              />
            )}
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
