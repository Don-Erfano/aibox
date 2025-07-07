import { TicketSchemaType } from '@/components/pages/ticketing/add-ticket/schema';
import { strings } from '@/constant';

export type PriorityValue = Exclude<TicketSchemaType['priority'], ''>;
export const PRIORITY_LABELS: Record<PriorityValue, string> = {
  low: strings.low,
  medium: strings.medium,
  high: strings.high,
};
