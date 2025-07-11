import { IPaginationMeta } from '@aibox/services';
import { IUser } from '../user/user-lists/interface';
import { IDepartment } from '../department';

export const FactorStatus = {
  DONE: 'done',
  FAIL: 'fail',
  IN_PROGRESS: 'in_progress',
  EXPIRED: 'expired',
} as const;

export type FactorStatusType = (typeof FactorStatus)[keyof typeof FactorStatus];

export interface IAddFactor {
  user: string;
  due_date?: string;
  created_at?: string;
  status?: FactorStatusType;
  description?: string;
  department?: string;
  price: number;
  discount_percent?: number;
}

export interface IUpdateFactor extends IAddFactor {
  id: string;
}

export interface IFactor {
  id: string;
  num: number;
  user: Omit<IUser, 'phone_number'> & { prfoile_picture: string };
  status: FactorStatusType;
  description: string;
  price: number;
  discount_percent: number;
  department: IDepartment;
  created_at: string;
  pay_date: string;
}

export interface IGetFactorsParams {
  user: string;
  status: string;
  department: string;
  created_at__lte: string;
  created_at__gte: string;
  pay_date__lte: string;
  pay_date__gte: string;
  price__lte: string;
  price__gte: string;
  discount_percent__lte: string;
  discount_percent__gte: string;
  page: string;
  page_size: number;
  search: string;
  ordering: string;
}

export interface IGetFactorsResponse extends IPaginationMeta {
  factor: IFactor[];
}
