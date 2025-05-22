'use client';

import { useCallback } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../form';
import AibAutocomplete from '../aib-autocomplete';
import { RHFAutocompleteProps } from './interface';
import { AutocompleteOption } from '../interface';

const RHFAutocomplete = <TField extends FieldValues>({
  name,
  control,
  label,
  description,
  options,
  placeholder,
  mode = 'light',
  variant = 'single',
  h_size = 'md',
  limited_tag,
  disabled,
  readOnly,
  isLoading,
  tagAdornment,
  ...rest
}: RHFAutocompleteProps<TField>) => {
  const isMultiple = variant === 'multiple';

  const defaultValue = (isMultiple ? ([] as string[]) : '') as PathValue<
    TField,
    Path<TField>
  >;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: { value, onChange, onBlur, name: fieldName },
        fieldState: { error },
      }) => {
        const convertedOptions: AutocompleteOption[] = options.map((opt) => ({
          id: opt.value,
          label: opt.label,
        }));

        const handleSelect = useCallback(
          (selectedOptions: AutocompleteOption[]) => {
            const newVal = isMultiple
              ? selectedOptions.map((o) => o.label)
              : selectedOptions[0]?.label ?? '';
            setTimeout(() => onChange(newVal), 0);
          },
          [onChange, isMultiple]
        );

        return (
          <FormItem className="flex flex-col gap-1">
            {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

            <FormControl>
              <AibAutocomplete
                {...rest}
                id={fieldName}
                name={fieldName}
                placeholder={placeholder}
                value={value}
                onSelect={handleSelect}
                onBlur={onBlur}
                options={convertedOptions}
                mode={mode}
                variant={variant}
                h_size={h_size}
                limited_tag={limited_tag}
                disabled={disabled}
                readOnly={readOnly}
                isLoading={isLoading}
                tagAdornment={tagAdornment}
              />
            </FormControl>

            {!error && description && (
              <FormDescription>{description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default RHFAutocomplete;
