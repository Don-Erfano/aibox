'use client';

import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormContainer, FormWrapper } from '@/components';
import { Button, Form, RHFInput, RHFAutocomplete } from '@aibox/ui';
import { useCreateTicket } from '@/services/ticketing/ticketing-list';
import { useGetAllUserList } from '@/services/user/user-all/user-all.hook';
import { useGetTicketingCategory } from '@/services/ticketing/ticketing-category/ticketing-category.hook';
import { useTicketingCategoryUserApis } from '@/services/ticketing/ticketing-category/ticketing-category.hook';
import { defaultValues, ticketSchema, TicketSchemaType } from './schema';
import { PRIORITY_LABELS, PriorityValue } from './constant';
import { IAnswerAdmin } from '@/services/ticketing/ticketing-list/interface';
import { TicketingString } from '@/components/pages/ticketing/ticketing-list/string';
import { SUPPORT_ROUTES } from '@/routes';

const AddTicketPage: FC = () => {
  const router = useRouter();
  const {
    users,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useGetAllUserList();
  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.email,
  }));

  const {
    categories,
    isLoading: isCatLoading,
    isFetching: isCatFetching,
  } = useGetTicketingCategory();
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const priorityOptions = (Object.keys(PRIORITY_LABELS) as PriorityValue[]).map(
    (level) => ({ value: level, label: PRIORITY_LABELS[level] })
  );

  const { mutate: createTicket, isPending: isCreating } = useCreateTicket();

  const form = useForm<TicketSchemaType>({
    resolver: zodResolver(ticketSchema),
    defaultValues,
  });
  const { watch, control, handleSubmit, reset } = form;

  const selectedCategoryId = watch('category');
  const selectedAssignees = watch('assignees') as string[];
  const firstAssigneeId = selectedAssignees?.[0];
  const selectedApiId = watch('api_id');

  const {
    apiQ,
    versionQ,
    apiOptions,
    isApisLoading,
    isApisFetching,
    versionOptions,
  } = useTicketingCategoryUserApis(
    selectedCategoryId,
    firstAssigneeId,
    selectedApiId
  );

  const onSubmit: SubmitHandler<TicketSchemaType> = (data) => {
    const answers: IAnswerAdmin[] = [];

    if (apiQ?.id && data.api_id) {
      answers.push({ question: apiQ.id, answer: data.api_id });
    }
    if (versionQ?.id && data.version_id) {
      answers.push({ question: versionQ.id, answer: data.version_id });
    }

    createTicket(
      {
        subject: data.subject,
        level: data.priority as PriorityValue,
        category: data.category,
        body: data.body,
        user_list: data.assignees,
        attachments: null,
        answers: answers.length ? answers : null,
      },
      {
        onSuccess: () => router.push(SUPPORT_ROUTES.TICKETING),
      }
    );
  };

  const handleCancel = () => {
    reset();
    router.push(SUPPORT_ROUTES.TICKETING);
  };

  return (
    <FormContainer title={TicketingString.add_new_ticket}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFInput
              name="subject"
              variant="sm"
              control={control}
              label={TicketingString.subject}
              placeholder={TicketingString.input_text}
            />

            <RHFAutocomplete
              name="priority"
              control={control}
              label={TicketingString.priority}
              h_size="sm"
              placeholder={TicketingString.choose_priority}
              options={priorityOptions}
              variant="single"
              mode="light"
            />

            <RHFAutocomplete
              name="category"
              control={control}
              label={TicketingString.category}
              h_size="sm"
              placeholder={TicketingString.choose_category}
              options={categoryOptions}
              variant="single"
              mode="light"
              disabled={isCatLoading || isCatFetching}
              isLoading={isCatLoading}
            />

            <RHFAutocomplete
              name="assignees"
              control={control}
              label={TicketingString.choose_user}
              h_size="sm"
              placeholder={TicketingString.add_user}
              options={userOptions}
              variant="multiple"
              mode="light"
              disabled={isUsersLoading || isUsersFetching}
              isLoading={isUsersLoading}
            />

            {apiQ && firstAssigneeId && (
              <RHFAutocomplete
                name="api_id"
                control={control}
                label={apiQ.text}
                placeholder={apiQ.text}
                h_size="sm"
                options={apiOptions}
                variant="single"
                mode="light"
                disabled={isApisLoading || isApisFetching}
                isLoading={isApisLoading}
              />
            )}

            {apiQ && firstAssigneeId && selectedApiId && (
              <RHFAutocomplete
                name="version_id"
                control={control}
                label={TicketingString.version}
                placeholder={TicketingString.choose_version}
                h_size="sm"
                options={versionOptions}
                variant="single"
                mode="light"
                disabled={versionOptions.length === 0}
                isLoading={false}
              />
            )}

            <RHFInput
              name="body"
              variant="sm"
              control={control}
              label="متن درخواست*"
              placeholder="متن ورودی"
            />
          </FormWrapper>

          <div className="flex gap-5 justify-center mt-12">
            <Button size="lg" isFilled type="submit" disabled={isCreating}>
              {TicketingString.submit}
            </Button>
            <Button
              size="lg"
              type="button"
              onClick={handleCancel}
              disabled={isCreating}
            >
              {TicketingString.cancel_operation}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddTicketPage;
