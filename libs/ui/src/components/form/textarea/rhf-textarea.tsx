import { FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import AIBTextarea from './textarea';
import { RHFTextareaProps } from './interface';
import clsx from 'clsx';

const RHFTextarea = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  maxLength,
  required,
  ...props
}: RHFTextareaProps<TFieldValues>) => (
  <FormField
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormItem className="group/textarea flex flex-col gap-1.5">
        {label && (
          <FormLabel
            className="flex justify-between"
            aria-disabled={props.disabled}
          >
            <span className="text-sm leading-5">
              {required ? `${label}*` : label}
            </span>
            {maxLength && (
              <span
                className={clsx('hidden text-xs font-light text-gray-400', {
                  'group-focus-within/textarea:block': !props.readOnly,
                })}
              >
                {maxLength}/
                <span className="text-zinc-600">
                  {field.value?.length || 0}
                </span>
              </span>
            )}
          </FormLabel>
        )}
        <FormControl>
          <AIBTextarea
            {...field}
            {...props}
            maxLength={maxLength}
            error={!!error?.message}
          />
        </FormControl>
        {!error && description && (
          <FormDescription
            className={clsx('text-xs font-light text-zinc-600', {
              'text-red-600': !!error,
            })}
          >
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default RHFTextarea;
