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
  ...props
}: RhfInputProps<TFieldValues>) => (
  <FormField
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <AIBInput {...field} {...props} />
        </FormControl>
        {!error && description && (
          <FormDescription>{description}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);
