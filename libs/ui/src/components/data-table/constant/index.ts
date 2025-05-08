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
