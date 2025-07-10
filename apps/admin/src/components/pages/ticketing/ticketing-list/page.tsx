'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useDataTable,
  DataTable,
  TableToolbar,
  Button,
  Form,
  RHFAutocomplete,
  Modal,
  ToggleGroup,
} from '@aibox/ui';
import { MessageSquareX, MessagesSquare, UserRoundPlus } from 'lucide-react';

import ticketColumns, { toggleItems } from './constant';
import {
  useGetTicketList,
  useAssignTicket,
  useUpdateTicketStatus,
} from '@/services/ticketing/ticketing-list';
import type {
  IAssignTicketRequest,
  IUpdateTicketStatusRequest,
} from '@/services/ticketing/ticketing-list/interface';

import {
  assignTicketSchema,
  type AssignTicketFormValues,
  assignTicketDefaultValues,
} from './schema';
import { useGetAllUserList } from '@/services/user/user-all';
import { FabButton } from '@/components/fab-button';
import { SUPPORT_ROUTES } from '@/routes';
import { strings } from '@/constant';

export const TicketingPage: FC = () => {
  const router = useRouter();
  const { tickets, totalItems, totalPages, isLoading, isFetching, refetch } =
    useGetTicketList();
  const assignMutation = useAssignTicket();
  const statusMutation = useUpdateTicketStatus();
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
  const [selectedTicket, setSelectedTicket] = useState<{ id: string } | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [closeModalKey, setCloseModalKey] = useState('init');
  const [selectedCloseTicket, setSelectedCloseTicket] = useState<{
    id: string;
  } | null>(null);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const form = useForm<AssignTicketFormValues>({
    resolver: zodResolver(assignTicketSchema),
    defaultValues: assignTicketDefaultValues,
  });
  const assignMe = form.watch('assign_me');
  useEffect(() => {
    if (assignMe) form.setValue('operator_id', '');
  }, [assignMe, form]);

  const openModalFor = (ticket: { id: string }) => {
    setSelectedTicket(ticket);
    setModalKey(`${ticket.id}`);
    form.reset(assignTicketDefaultValues);
    setIsModalOpen(true);
  };

  const openCloseModalFor = (ticket: { id: string }) => {
    setSelectedCloseTicket(ticket);
    setCloseModalKey(`${ticket.id}`);
    setIsCloseModalOpen(true);
  };

  const handleAddTicket = () => {
    router.push(SUPPORT_ROUTES.ADD_TICKET);
  };

  const onSubmit: SubmitHandler<AssignTicketFormValues> = (data) => {
    if (!selectedTicket) return;
    const body = data.assign_me
      ? { assign_me: true }
      : { assign_me: false, operator_id: data.operator_id! };
    const payload: IAssignTicketRequest = { data: body };

    assignMutation.mutate(
      { path: { id: selectedTicket.id }, payload },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          refetch();
        },
      }
    );
  };

  const handleCloseConfirm = () => {
    if (!selectedCloseTicket) return;
    const payload: IUpdateTicketStatusRequest = {
      id: selectedCloseTicket.id,
      status: 'closed',
    };
    statusMutation.mutate(payload, {
      onSuccess: () => setIsCloseModalOpen(false),
    });
  };

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: tickets,
    columns: ticketColumns,
    pageCount: totalPages,
    actions: {
      customActions: [
        {
          label: 'تخصیص دادن',
          icon: <UserRoundPlus className="size-5" />,
          onClick: (row) => openModalFor(row as { id: string }),
        },
        {
          label: 'ایجاد تیکت',
          icon: <MessagesSquare className="size-5" />,
          onClick: (row) =>
            router.push(`${SUPPORT_ROUTES.TICKETING}/${row.id}`),
        },
        {
          label: 'بستن تیکت',
          icon: <MessageSquareX className="size-5" />,
          onClick: (row) => openCloseModalFor(row as { id: string }),
        },
      ],
    },
  });

  return (
    <>
      <div className="relative shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.tickets}
          totalItems={totalItems}
          table={table}
          refreshLoading={isLoading || isFetching}
          refetch={refetch}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />
        <DataTable table={table} />
      </div>

      <FabButton onClick={handleAddTicket} />

      <Modal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsModalOpen(false);
        }}
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
              <Button variant="default" size="lg" type="submit" isFilled>
                {strings.submit}
              </Button>
              <Button
                variant="default"
                size="lg"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                {strings.cancel}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>

      <Modal
        open={isCloseModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsCloseModalOpen(false);
        }}
        title={strings.close_ticket}
      >
        <div
          key={closeModalKey}
          className="space-y-4 px-4 sm:px-6 pb-6 text-center"
        >
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
            >
              {strings.close_ticket}
            </Button>
            <Button
              variant="default"
              size="lg"
              type="button"
              onClick={() => setIsCloseModalOpen(false)}
            >
              {strings.cancel}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TicketingPage;
