import { z } from 'zod';

import { transactionModalFormSchema } from './constants';

export interface Transaction {
  id: string;
  track_id: string;
  amount: number;
  status: string;
  title: string;
  date: string;
  kind: string;
  user: {
    id: string;
    email: string;
    profile_picture: string;
  };
  explication: string[];
  description: string;
  wallet_amount: number;
}

export interface AddTransaction {
  amount: number;
  title: string;
  kind: string;
  status: string;
  description: string;
}

export type TransactionModalFormType = z.infer<
  typeof transactionModalFormSchema
>;

export interface ModalState {
  show: boolean;
  transactionData?: Partial<TransactionModalFormType>;
  id?: string;
  isEdit?: boolean;
}

export interface TransactionModalProps {
  modalState: ModalState;
  toggleModal: React.Dispatch<React.SetStateAction<ModalState>>;
}
