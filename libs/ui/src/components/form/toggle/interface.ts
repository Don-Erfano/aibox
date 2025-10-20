import { Control, FieldValues, Path } from "react-hook-form";

export type ToggleSize = "fixed" | "auto";

export interface ToggleItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ToggleBaseProps {
  value: string;
  onValueChange: (value: string) => void;
  size?: ToggleSize;
}

export interface Primary {
  variant?: "primary";
  items: ToggleItem[];
  disabled?: boolean;
  readonly?: boolean;
  onOff?: false;
}

export interface Secondary {
  variant?: "secondary";
  items: ToggleItem[];
}

export interface PrimaryWithOff {
  variant?: "primary";
  items: [ToggleItem, ToggleItem];
  onOff?: true;
  disabled?: boolean;
  readonly?: boolean;
}

export type ToggleProps = ToggleBaseProps &
  (Primary | Secondary | PrimaryWithOff);

export type RHFToggleProps<TFieldValues extends FieldValues> = (
  | Primary
  | PrimaryWithOff
) & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  size?: ToggleSize;
};
