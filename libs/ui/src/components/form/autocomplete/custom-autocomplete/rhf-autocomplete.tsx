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
  getOptionLabel,
  getOptionValue,
  ...rest
}: RHFAutocompleteProps<TField>) => {
  const isMultiple = variant === 'multiple';

  const extractValue =
    getOptionValue ?? ((opt: any) => opt.value ?? opt.id ?? String(opt));
  const extractLabel =
    getOptionLabel ?? ((opt: any) => opt.label ?? opt.name ?? String(opt));

  const convertedOpts: AutocompleteOption[] = options.map((opt) => ({
    id: extractValue(opt),
    label: extractLabel(opt),
  }));

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
        const displayValue = isMultiple
          ? Array.isArray(value)
            ? (value as string[]).map(
                (val) => convertedOpts.find((o) => o.id === val)?.label ?? val
              )
            : []
          : convertedOpts.find((o) => o.id === value)?.label ??
            (value as string);

        const handleSelect = useCallback(
          (selected: AutocompleteOption[]) => {
            const out = isMultiple
              ? selected.map((o) => o.id)
              : selected[0]?.id ?? '';
            setTimeout(() => onChange(out as any), 0);
          },
          [onChange, isMultiple]
        );

        return (
          <FormItem className="flex flex-col gap-1">
            {!!label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

            <FormControl>
              <AibAutocomplete
                {...rest}
                id={fieldName}
                name={fieldName}
                placeholder={placeholder}
                value={displayValue as string | string[]}
                onSelect={handleSelect}
                onBlur={onBlur}
                options={convertedOpts}
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
