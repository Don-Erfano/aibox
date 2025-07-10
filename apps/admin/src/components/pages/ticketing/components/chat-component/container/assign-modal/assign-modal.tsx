'use client';

import { FC, useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Form, RHFAutocomplete, Modal, ToggleGroup } from '@aibox/ui';

import { useAssignTicket } from '@/services/ticketing/ticketing-list';
import type { IAssignTicketRequest } from '@/services/ticketing/ticketing-list/interface';

import { useGetAllUserList } from '@/services/user/user-all';
import { strings } from '@/constant';
import {
  assignTicketDefaultValues,
  AssignTicketFormValues,
  assignTicketSchema,
} from '@/components/pages/ticketing/ticketing-list/schema';
import { toggleItems } from '@/components/pages/ticketing/ticketing-list/constant';
import { AssignModalProps } from './interface';

export const AssignModal: FC<AssignModalProps> = ({
  open,
  onOpenChange,
  ticketId,
  onSuccess,
}) => {
  const assignMutation = useAssignTicket();
  const {
    users: adminUsers,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useGetAllUserList({ is_admin: true });

  const adminOptions = adminUsers.map((u) => ({
    value: u.id,
    label: u.email,
  }));

  const [modalKey, setModalKey] = useState('init');

  const form = useForm<AssignTicketFormValues>({
    resolver: zodResolver(assignTicketSchema),
    defaultValues: assignTicketDefaultValues,
  });

  const assignMe = form.watch('assign_me');

  useEffect(() => {
    if (assignMe) form.setValue('operator_id', '');
  }, [assignMe, form]);

  useEffect(() => {
    if (open && ticketId) {
      setModalKey(`assign-${ticketId}`);
      form.reset(assignTicketDefaultValues);
    }
  }, [open, ticketId, form]);

  const onSubmit: SubmitHandler<AssignTicketFormValues> = (data) => {
    if (!ticketId) return;

    const body = data.assign_me
      ? { assign_me: true }
      : { assign_me: false, operator_id: data.operator_id! };
    const payload: IAssignTicketRequest = { data: body };

    assignMutation.mutate(
      { path: { id: ticketId }, payload },
      {
        onSuccess: () => {
          onOpenChange(false);
          onSuccess?.();
        },
      }
    );
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={strings.assign_ticket}
    >
      <Form {...form}>
        <form
          key={modalKey}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-4 sm:px-6 pb-6"
        >
          <Controller
            name="assign_me"
            control={form.control}
            render={({ field }) => (
              <div className="flex items-center justify-center">
                <ToggleGroup
                  items={toggleItems}
                  value={field.value ? 'self' : 'others'}
                  onValueChange={(val) => field.onChange(val === 'self')}
                />
              </div>
            )}
          />

          {!assignMe && (
            <RHFAutocomplete
              name="operator_id"
              control={form.control}
              placeholder={strings.choose_operator}
              options={adminOptions}
              variant="single"
              mode="light"
              h_size="md"
              isLoading={isUsersLoading || isUsersFetching}
              getOptionLabel={(opt) => opt.label}
              getOptionValue={(opt) => opt.value}
            />
          )}

          <div className="flex justify-center items-center space-x-5 pt-4">
            <Button
              variant="default"
              size="lg"
              type="submit"
              isFilled
              disabled={assignMutation.isPending}
            >
              {assignMutation.isPending ? strings.sending : strings.submit}
            </Button>
            <Button
              variant="default"
              size="lg"
              type="button"
              onClick={handleClose}
            >
              {strings.cancel}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AssignModal;
