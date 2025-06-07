'use client';

import { SidebarItem } from '../components/sidebar/type';
import { usePathname } from 'next/navigation';

/**
 * Returns an array where each item has an added `isActive` property
 */
export function useSidebarItemsActive(
  sidebarData: SidebarItem[]
): SidebarItem[] {
  const pathname = usePathname();

  return sidebarData.map((item) => ({
    ...item,
    isActive: isSidebarItemActive(item, pathname),
  }));
}

function isSidebarItemActive(item: SidebarItem, currentPath: string): boolean {
  if (item.url === currentPath) return true;
  if (item.items) {
    return item.items.some((sub) => sub.url === currentPath);
  }
  return false;
}

export function useSidebarItemActive(item: SidebarItem): boolean {
  const pathname = usePathname();
  return isSidebarItemActive(item, pathname);
}
