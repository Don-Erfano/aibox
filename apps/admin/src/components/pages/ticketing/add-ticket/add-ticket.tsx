'use client';

import { FC, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer, FormWrapper } from '@/components';
import { Button, Form, RHFInput, RHFAutocomplete } from '@aibox/ui';
import { useGetTicketList } from '@/services/ticketing/ticketing-list';
import {
  defaultValues,
  ticketSchema,
  TicketSchemaType,
} from '@/components/pages/ticketing/add-ticket/schema';

const PRIORITY_LABELS: Record<TicketSchemaType['priority'], string> = {
  low: 'کم',
  medium: 'متوسط',
  high: 'زیاد',
};

const AddTicketPage: FC = () => {
  const { tickets, isLoading: isTicketsLoading } = useGetTicketList();

  const priorityOptions = useMemo(() => {
    const levels = Array.from(
      new Set(
        tickets.map((ticket) => ticket.level as TicketSchemaType['priority'])
      )
    );
    return levels.map((level) => ({
      value: level,
      label: PRIORITY_LABELS[level],
    }));
  }, [tickets]);

  const categoryOptions = useMemo(
    () =>
      Array.from(new Set(tickets.map((ticket) => ticket.category))).map(
        (category) => ({
          value: category,
          label: category,
        })
      ),
    [tickets]
  );

  const userOptions = useMemo(
    () =>
      Array.from(new Set(tickets.map((ticket) => ticket.user_id))).map(
        (user) => ({
          value: user,
          label: user,
        })
      ),
    [tickets]
  );

  const form = useForm<TicketSchemaType>({
    resolver: zodResolver(ticketSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<TicketSchemaType> = (data) => {
    console.log('form data', data);
    // TODO: call your create-ticket mutation here
  };

  return (
    <FormContainer title="افزودن تیکت جدید">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFInput
              name="subject"
              control={form.control}
              label="عنوان درخواست*"
              placeholder="متن ورودی"
            />

            <RHFAutocomplete
              name="priority"
              control={form.control}
              label="اولویت*"
              placeholder="انتخاب اولویت"
              options={priorityOptions}
              variant="single"
              mode="light"
              isLoading={isTicketsLoading}
            />

            <RHFAutocomplete
              name="category"
              control={form.control}
              label="دسته‌بندی*"
              placeholder="انتخاب دسته‌بندی"
              options={categoryOptions}
              variant="single"
              mode="light"
              isLoading={isTicketsLoading}
            />

            <RHFAutocomplete
              name="assignees"
              control={form.control}
              label="انتخاب کاربر*"
              placeholder="انتخاب کاربر"
              options={userOptions}
              variant="multiple"
              mode="light"
              isLoading={isTicketsLoading}
            />
          </FormWrapper>

          <div className="flex gap-5 justify-center mt-6">
            <Button size="lg" isFilled type="submit">
              ثبت
            </Button>
            <Button size="lg" type="button" onClick={() => form.reset()}>
              لغو عملیات
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddTicketPage;
