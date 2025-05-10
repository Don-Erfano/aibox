export interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  toggleOpen: (value: boolean) => void;
  placeholder?: string;
}
