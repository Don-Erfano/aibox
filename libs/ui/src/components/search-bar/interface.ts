export interface SearchBarProps {
  open: boolean;
  toggleOpen: (value: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}
