export interface DefaultMessageProps {
  category_title: string;
  title_number: number;
  message: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}
