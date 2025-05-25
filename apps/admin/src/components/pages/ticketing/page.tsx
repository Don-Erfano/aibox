'use client';

import { FC, useState, useMemo, useEffect } from 'react';
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
import {
  MessageSquareX,
  MessagesSquare,
  Plus,
  UserRoundPlus,
} from 'lucide-react';

import ticketColumns, {
  toggleItems,
} from '@/components/pages/ticketing/constant';
import {
  useGetTicketList,
  useAssignTicket,
} from '@/services/ticketing/ticketing-list';
import type { IAssignTicketRequest } from '@/services/ticketing/ticketing-list/interface';

import {
  assignTicketSchema,
  type AssignTicketFormValues,
  assignTicketDefaultValues,
} from '@/components/pages/ticketing/schema';

export const TicketingPage: FC = () => {
  const router = useRouter();
  const { tickets, totalItems, totalPages, isLoading, isFetching, refetch } =
    useGetTicketList();
  const assignMutation = useAssignTicket();

  const [modalKey, setModalKey] = useState<string>('init');
  const [selectedTicket, setSelectedTicket] = useState<{ id: string } | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userOptions = useMemo(
    () =>
      Array.from(new Set(tickets.map((t) => t.user_id))).map((user) => ({
        value: user,
        label: user,
      })),
    [tickets]
  );

  const form = useForm<AssignTicketFormValues>({
    resolver: zodResolver(assignTicketSchema),
    defaultValues: assignTicketDefaultValues,
  });

  const assignMe = form.watch('assign_me');
  useEffect(() => {
    if (assignMe) {
      form.setValue('operator_id', '');
    }
  }, [assignMe, form]);

  const openModalFor = (ticket: { id: string }) => {
    setSelectedTicket(ticket);
    setModalKey(`${ticket.id}-${Date.now()}`);
    form.reset(assignTicketDefaultValues);
    setIsModalOpen(true);
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
        },
      }
    );
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
          onClick: (row) => console.log(`${row.id} ${row.status}`),
        },
        {
          label: 'بستن تیکت',
          icon: <MessageSquareX className="size-5" />,
          onClick: (row) => console.log(`${row.id} ${row.status}`),
        },
      ],
    },
  });

  const handleAddTicketing = () => {
    router.push('/dashboard/ticketing/add-ticket');
  };

  return (
    <>
      <div className="relative h-full">
        <TableToolbar
          title="تیکت‌ها"
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
        <Button
          onClick={handleAddTicketing}
          variant="ghost"
          className="absolute bottom-2 left-2 size-12 rounded-full bg-teal-600 shadow-2xl text-2xl hover:bg-teal-700"
        >
          <Plus strokeWidth={2.5} className="text-white size-6" />
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
          }
        }}
        title="تخصیص تیکت"
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
                placeholder="انتخاب اپراتور"
                options={userOptions}
                variant="single"
                mode="light"
                h_size="md"
                isLoading={isLoading || isFetching}
              />
            )}

            <div className="flex justify-center items-center space-x-5 pt-4">
              <Button
                variant="default"
                size="lg"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                انصراف
              </Button>
              <Button variant="default" size="lg" type="submit" isFilled>
                ثبت
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default TicketingPage;
