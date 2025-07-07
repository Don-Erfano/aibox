import { z } from 'zod';
import { configurationSchema } from './constants';

interface IConfigurationForm {
  gpu_id: string;
  motherboard_id: string;
  hourly_price: string;
  discount: string;
  is_active: string;
}

type TRequestData = z.infer<typeof configurationSchema>;

export type { IConfigurationForm, TRequestData };
