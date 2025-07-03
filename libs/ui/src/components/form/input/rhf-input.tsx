import { FieldValues } from 'react-hook-form';
import { RhfInputProps } from './interface';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './../form';
import { AIBInput } from './input';

export const RHFInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  type,
  ...props
}: RhfInputProps<TFieldValues>) => (
  <FormField
    name={name}
    control={control}
    render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <AIBInput
            onChange={(e) => {
              onChange(
                type === 'number'
                  ? e.target.value === ''
                    ? undefined
                    : e.target.valueAsNumber
                  : e.target.value
              );
            }}
            type={type}
            {...rest}
            {...props}
          />
        </FormControl>
        {!error && description && (
          <FormDescription>{description}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);
