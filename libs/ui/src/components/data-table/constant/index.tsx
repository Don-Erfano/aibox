import { ReactNode } from 'react';
import { ChartLine as ChartIcon, Grid3X3 as TableIcon } from 'lucide-react';

import { ViewModeButton } from '../types';

export const translations = {
  pageInfo: (current: number, total: number) => `صفحه ${current} از ${total}`,
  goToPage: 'برو به صفحه:',
  show: (size: number) => `نمایش ${size}`,
};

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  filterVariants: [
    'text',
    'number',
    'range',
    'date',
    'dateRange',
    'boolean',
    'select',
    'multiSelect',
  ] as const,
};

export const viewModeList: { name: ViewModeButton; icon: ReactNode }[] = [
  { name: 'chart', icon: <ChartIcon /> },
  { name: 'table', icon: <TableIcon /> },
];
