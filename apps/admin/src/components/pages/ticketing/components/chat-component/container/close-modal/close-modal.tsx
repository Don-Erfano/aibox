'use client';

import { FC, useState, useEffect } from 'react';
import { Button, Modal } from '@aibox/ui';
import { useUpdateTicketStatus } from '@/services/ticketing/ticketing-list';
import type { IUpdateTicketStatusRequest } from '@/services/ticketing/ticketing-list/interface';
import { strings } from '@/constant';
import { CloseModalProps } from './interface';
import { SUPPORT_ROUTES } from '@/routes';
import { useRouter } from 'next/navigation';

export const CloseModal: FC<CloseModalProps> = ({
  open,
  onOpenChange,
  ticketId,
  onSuccess,
}) => {
  const statusMutation = useUpdateTicketStatus();
  const [modalKey, setModalKey] = useState('init');
  const router = useRouter();
  useEffect(() => {
    if (open && ticketId) {
      setModalKey(`close-${ticketId}`);
    }
  }, [open, ticketId]);

  const handleCloseConfirm = () => {
    if (!ticketId) return;

    const payload: IUpdateTicketStatusRequest = {
      id: ticketId,
      status: 'closed',
    };

    statusMutation.mutate(payload, {
      onSuccess: () => {
        router.push(SUPPORT_ROUTES.TICKETING);
        onOpenChange(false);
        onSuccess?.();
      },
    });
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={strings.close_ticket}>
      <div key={modalKey} className="space-y-4 px-4 sm:px-6 pb-6 text-center">
        <h3 className="text-sm font-medium text-slate-950">
          {strings.close_ticket_title}
        </h3>
        <p className="text-sm text-gray-500">
          {strings.close_ticket_description}
        </p>
        <div className="flex justify-center items-center space-x-5 pt-4">
          <Button
            variant="default"
            size="lg"
            isFilled
            type="button"
            onClick={handleCloseConfirm}
            disabled={statusMutation.isPending}
          >
            {statusMutation.isPending ? strings.closing : strings.close_ticket}
          </Button>
          <Button
            variant="default"
            size="lg"
            type="button"
            onClick={handleCancel}
            disabled={statusMutation.isPending}
          >
            {strings.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CloseModal;
