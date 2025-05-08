import { Controller, FieldValues } from 'react-hook-form';
import { BaseTextField } from './baseTextField';
import { IRhfTextfieldProps } from './interface';

const RhfTextfield = <TField extends FieldValues>({
  name,
  control,
  rules,
  disabled,
  defaultValue,
  ...props
}: IRhfTextfieldProps<TField>) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    disabled={disabled}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <BaseTextField {...props} {...field} error={fieldState.error?.message} />
    )}
  />
);

export default RhfTextfield;
