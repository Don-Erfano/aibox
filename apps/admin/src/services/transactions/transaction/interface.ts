import { IPaginationMeta } from '@aibox/services';

export interface AdminTransactionListParams {
  user?: string;
  title?:
    | 'deposit'
    | 'withdraw'
    | 'api_buy'
    | 'api_sale'
    | 'compute'
    | 'wage'
    | 'package'
    | 'gift_code'
    | 'factor';
  kind?: 'withdraw' | 'deposit';
  status?: 'done' | 'fail' | 'in_progress' | 'cancel';
  abs_amount__lte?: number;
  abs_amount__gte?: number;
  date__gte?: string;
  date__lte?: string;
  page_size?: number;
  page?: number;
}

export interface TransactionListResponse extends IPaginationMeta {
  transactions: Transaction[];
  remain_charge: number;
  withdraw_amount: number;
  earn_amount: number;
}

export interface Transaction {
  id: string;
  ref_number?: string;
  track_id: string;
  amount: number;
  status: string;
  title: string;
  date: string;
  kind: string;
  user: UserSummary;
  wallet_amount: number;
  explanation: Record<string, string>;
  explication: string[];
  description: string;
}

export interface UserSummary {
  id: string;
  email: string;
  profile_picture: string;
}
export interface UpdateTransactionRequest {
  status: 'موفق' | 'ناموفق';
  description?: string;
  track_id: string;
}

export interface UpdateTransactionParams {
  transaction_id: string;
  data: UpdateTransactionRequest;
}

export type UpdateTransactionResponse = Transaction;
export type TransactionListNetworkResponse = TransactionListResponse;
