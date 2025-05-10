import { ChartLine as ChartIcon, Grid3X3 as TableIcon } from 'lucide-react';

import { EViewModeButton, FilterIconButton } from '../types';

export const viewModeButtons: FilterIconButton<EViewModeButton>[] = [
  { name: EViewModeButton.CHART, icon: <ChartIcon />, hasChip: false },
  { name: EViewModeButton.TABLE, icon: <TableIcon />, hasChip: false },
];
