'use client';

import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useParams } from 'next/navigation';
import { Form, RHFInput, RHFAutocomplete, Button, toast } from '@aibox/ui';
import { FormContainer, FormWrapper } from '@/components';
import { strings } from '@/constant';
import {
  useCreateNotifMessage,
  useUpdateNotifMessage,
  useGetNotifMessageById,
  useGetCategories,
} from '@/services';
import {
  defaultValues,
  editDefaultMessageSchema,
  EditDefaultMessageSchemaType,
} from './schema';
import { MESSAGES_ROUTES } from '@/routes';

const AddDefaultMessage: FC = () => {
  const router = useRouter();
  const params = useParams();
  const messageId = params?.id as string;
  const isEditMode = !!messageId && messageId !== 'new';

  const createNotifMessage = useCreateNotifMessage();
  const updateNotifMessage = useUpdateNotifMessage();
  const { categories, isLoading: isLoadingCategories } = useGetCategories();
  const { notifMessage, isLoading: isLoadingMessage } = useGetNotifMessageById(
    isEditMode ? messageId : ''
  );

  const form = useForm<EditDefaultMessageSchemaType>({
    resolver: zodResolver(editDefaultMessageSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset, setValue } = form;

  useEffect(() => {
    if (isEditMode && notifMessage) {
      setValue('title', notifMessage.title);
      setValue('message', notifMessage.message);
      setValue('category', notifMessage.category.id);
    }
  }, [isEditMode, notifMessage, setValue]);

  const onSubmit: SubmitHandler<EditDefaultMessageSchemaType> = async (
    data
  ) => {
    try {
      const messageData = {
        title: data.title,
        message: data.message,
        category: data.category,
      };

      const response = isEditMode
        ? await updateNotifMessage.mutateAsync({
            id: messageId,
            data: messageData,
          })
        : await createNotifMessage.mutateAsync(messageData);

      toast.success(response.detail);
      router.push(MESSAGES_ROUTES.DEFAULT_MESSAGE);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    reset();
    router.push(MESSAGES_ROUTES.DEFAULT_MESSAGE);
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const isMutating =
    createNotifMessage.isPending || updateNotifMessage.isPending;

  if (isEditMode && isLoadingMessage) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <FormContainer
      title={
        isEditMode
          ? strings.edit_new_default_message
          : strings.add_new_default_message
      }
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFInput
              name="title"
              label={strings.title}
              control={control}
              placeholder={strings.subjectTitle}
            />
            <RHFAutocomplete
              name="category"
              control={control}
              label={strings.category}
              placeholder={strings.selectCategory}
              options={categoryOptions}
              variant="single"
              mode="light"
              isLoading={isLoadingCategories}
            />

            <RHFInput
              name="message"
              label={strings.messageText}
              control={control}
              placeholder={strings.subjectDescription}
              type="text"
            />
          </FormWrapper>

          <div className="flex gap-5 justify-center mt-12">
            <Button size="lg" isFilled type="submit" loading={isMutating}>
              {isEditMode ? strings.submitChanges : strings.submit}
            </Button>
            <Button
              size="lg"
              type="button"
              onClick={handleCancel}
              disabled={isMutating}
            >
              {strings.ignore}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddDefaultMessage;
