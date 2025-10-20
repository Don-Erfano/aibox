import { ReactNode } from "react";

export interface SearchBarProps {
  loading?: boolean;
  searchPlaceholder?: string;
}

export type IconState = "loading" | "search" | "searchHover" | "clear" | "none";

export type IconRecord = Record<
  IconState,
  { icon: ReactNode; onClick?: () => void }
>;
