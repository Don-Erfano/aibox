import { z } from 'zod';

import { giftCodeSchema } from './constants';

export type GiftCodeFields = z.infer<typeof giftCodeSchema>;

export interface GiftCodeFormProps {
  giftCodeId?: string;
}

export interface DeleteModal {
  show: boolean;
  id?: string;
}

export interface DeleteGiftCodeModalProps {
  modalState: DeleteModal;
  toggleModal: React.Dispatch<React.SetStateAction<DeleteModal>>;
}
