import { TicketSchemaType } from '@/components/pages/ticketing/add-ticket/schema';

export type PriorityValue = Exclude<TicketSchemaType['priority'], ''>;
export const PRIORITY_LABELS: Record<PriorityValue, string> = {
  low: 'کم',
  medium: 'متوسط',
  high: 'زیاد',
};
