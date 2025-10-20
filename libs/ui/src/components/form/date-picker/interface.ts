import { Control, FieldValues, Noop, Path } from "react-hook-form";

interface IRangeDatePicker {
  onChange: (date: { to?: string; from?: string }) => void;
  error?: boolean;
  onBlur: Noop;
  disabled?: boolean;
  readOnly?: boolean;
}

interface ISingleDatePickerProps {
  onChange: (date: string | undefined) => void;
  value?: string;
  onBlur: Noop;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

interface IRhfDatePicker<TFieldValues extends FieldValues> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
}
type TRhfDatePicker<TFieldValues extends FieldValues> =
  IRhfDatePicker<TFieldValues> &
    (
      | {
          mode: "single";
        }
      | {
          mode: "range";
        }
    );

export type {
  IRangeDatePicker,
  ISingleDatePickerProps,
  IRhfDatePicker,
  TRhfDatePicker,
};
