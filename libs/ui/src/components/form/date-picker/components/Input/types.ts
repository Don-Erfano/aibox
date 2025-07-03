export interface IDatePickerInput {
  value: string[];
  label?: string;
  helperText?: string;
  clearAction: () => void;
  handleChange: (e: string[]) => void;
}
