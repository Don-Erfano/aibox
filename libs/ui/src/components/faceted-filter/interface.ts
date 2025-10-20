import { FC, SVGProps } from "react";

export interface FacetedFilterProps {
  title?: string;
  options: OptionFilter[];
  value?: string[];
  onChange?: (value: string[]) => void;
  multiple?: boolean;
}
export interface OptionFilter {
  label: string;
  value: string;
  count?: number;
  icon?: FC<SVGProps<SVGSVGElement>>;
}
