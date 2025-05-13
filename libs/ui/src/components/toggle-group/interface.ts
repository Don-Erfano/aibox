export interface ToggleGroupProps {
  items: { label: string; value: string }[];
  selected: string;
  setSelected: (value: string) => void;
}

export interface Rect {
  width: number;
  height: number;
  x: number;
}
