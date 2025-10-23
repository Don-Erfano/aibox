import { LogStatus, MonthlyStatus, ServerStatusLog } from '@/services/gpu';
import { rejectFormSchema } from './constants';
import z from 'zod';

interface IGpuList {
  model: string;
  ram: string;
  brand: string;
  coda_core: string;
  reliablity: string;
  free_hours: string;
  free_days: string;
  is_active: string;
  id: string;
}

type MonthlyStatusMap = Record<
  MonthlyStatus,
  { label: string; bgColor: string }
>;

type LogStatusMap = Record<LogStatus, { label: string; bgColor: string }>;
type ServerStatusMap = Record<
  ServerStatusLog,
  { label: string; bgColor: string }
>;

interface ApprovalState {
  show: boolean;
  id?: string;
}

interface ApprovalModalState {
  modalState: ApprovalState;
  toggleModal: React.Dispatch<React.SetStateAction<ApprovalState>>;
}

type RejectForm = z.infer<typeof rejectFormSchema>;

export type {
  IGpuList,
  MonthlyStatusMap,
  LogStatusMap,
  ApprovalState,
  ApprovalModalState,
  RejectForm,
  ServerStatusMap,
};
