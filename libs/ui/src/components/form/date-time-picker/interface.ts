export type TimePickerType = "minutes" | "seconds" | "hours";

export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date?: Date | null;
  onDateChange?: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export interface TimePickerProps {
  date?: Date | null;
  onChange?: (date: Date | undefined) => void;
  granularity?: Granularity;
  onConfirm: () => void;
}

export interface TimePickerRef {
  minuteRef: HTMLInputElement | null;
  hourRef: HTMLInputElement | null;
  secondRef: HTMLInputElement | null;
}

export type Granularity = "day" | "hour" | "minute" | "second";

export interface DateTimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  granularity?: Granularity;
  className?: string;
  outputFormat?: string;
  displayFormat?: string;
}
