export interface ToggleGroupProps {
  items: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

export interface Rect {
  width: number;
  height: number;
  x: number;
}
