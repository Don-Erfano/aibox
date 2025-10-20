import { ComponentProps, ReactNode } from "react";
import { Sidebar } from "./sidebar";

export interface SidebarSubItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface SidebarItem {
  title: string;
  url?: string;
  icon: ReactNode;
  /** Marks the active top-level item; defaults to false if omitted */
  isActive?: boolean;
  items?: SidebarSubItem[];
}

/** The full sidebar data */
export type SidebarData = SidebarItem[];
export interface AibSidebarProps extends ComponentProps<typeof Sidebar> {
  sidebarData: SidebarData;
  className?: string;
}
