import { Control, FieldValues, Path } from 'react-hook-form';

type ControlledProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  value?: never;
  onChange?: never;
};

type UncontrolledProps = {
  control?: undefined;
  name?: never;
  rules?: never;
  value: string;
  onChange: (value: string) => void;
};

export type EditorProps<TFieldValues extends FieldValues = FieldValues> = (
  | ControlledProps<TFieldValues>
  | UncontrolledProps
) & {
  height?: string;
  error?: string;
  placeholder?: string;
  label?: string;
};
