'use client';

import { FC, useEffect, useState, useMemo } from 'react';
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import DropDownSelect from '@/components/pages/messages/components/drop-down-select/drop-down-select';
import { DefaultMessage } from '@/components/pages/messages/components/default-message';
import {
  Button,
  Form,
  RHFAutocomplete,
  RHFInput,
  Switch,
  toast,
  RhfDatePicker,
} from '@aibox/ui';
import { FormContainer, FormWrapper } from '@/components';
import {
  defaultValues,
  publicMessageSchema,
  PublicMessageSchemaType,
} from './schema';
import {
  useCreateMassNotification,
  useGetMassNotificationCategories,
  ICreateMassNotificationRequest,
  ICategory,
} from '@/services/messages/public-messages';
import { useGetAllUserList } from '@/services/user/user-all';
import { strings } from '@/constant';
import { CustomMessage } from '@/components/pages/messages/components/custom-message';
import { useGetCategories, useGetContentMessages } from '@/services';
import { CustomMessageValues } from '@/components/pages/messages/components/custom-message/interface';
import { NotifMessage } from './interface';

const AddPublicMessagePage: FC = () => {
  const router = useRouter();

  const form = useForm<PublicMessageSchemaType>({
    resolver: zodResolver(publicMessageSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { control, handleSubmit, reset } = form;
  const { isSubmitting, isValid } = useFormState({ control });

  const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([]);
  const [useDropdown, setUseDropdown] = useState(true);
  const [customMessageValues, setCustomMessageValues] =
    useState<CustomMessageValues>(['']);
  const [selectedValue, setSelectedValue] = useState<string | undefined>('all');

  const createMassNotificationMutation = useCreateMassNotification();
  const {
    data: massNotificationCategories = { data: { category: [] } },
    isLoading: categoriesLoading,
  } = useGetMassNotificationCategories();
  const { users, isLoading: usersLoading } = useGetAllUserList();
  const { notifMessages } = useGetContentMessages();
  const { categories: filterCategories } = useGetCategories();

  useEffect(() => {
    setSelectedMessageIds([]);
  }, [selectedValue]);

  useEffect(() => {
    setSelectedMessageIds([]);
    setCustomMessageValues(['']);
  }, [useDropdown]);

  const userOptions = [
    { value: 'all', label: 'همه کاربران' },
    ...(users?.map((user) => ({
      value: user.id,
      label: user.email,
    })) || []),
  ];

  const autocompleteCategoryOptions = useMemo(
    () =>
      massNotificationCategories?.data?.category?.map((cat: ICategory) => ({
        value: cat.id,
        label: cat.name,
      })) || [],
    [massNotificationCategories]
  );

  const dropdownCategoryOptions = useMemo(
    () => [
      { value: 'all', label: strings.all },
      ...(filterCategories || []).map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    ],
    [filterCategories]
  );

  const filteredMessages = useMemo(() => {
    if (!notifMessages) return [];

    return selectedValue === 'all'
      ? notifMessages
      : notifMessages.filter((item) => item.category?.id === selectedValue);
  }, [notifMessages, selectedValue]);

  const messageContent = useMemo(() => {
    if (!useDropdown) {
      return customMessageValues.filter(Boolean).join('\n');
    }
    return selectedMessageIds
      .map((id) => {
        const selectedMessage = notifMessages?.find(
          (msg: NotifMessage) => msg.id === id
        );
        return selectedMessage?.message ?? '';
      })
      .filter(Boolean)
      .join('\n');
  }, [useDropdown, customMessageValues, notifMessages, selectedMessageIds]);

  const toggleSelection = (id: string, isNowChecked: boolean) => {
    setSelectedMessageIds((prev) =>
      isNowChecked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)
    );
  };

  const onSubmit: SubmitHandler<PublicMessageSchemaType> = async (data) => {
    try {
      const payload: ICreateMassNotificationRequest = {
        user: data.recivers === 'all' ? 'all' : data.recivers,
        category: data.category,
        name: data.message_group || data.message_subject,
        from_time: data.date_from[0],
        to_time: data.date_to[0],
        subject: data.message_subject,
        message: useDropdown ? selectedMessageIds[0] : messageContent,
        message_text: messageContent,
        notif_type: 'in_header',
      };

      const response = await createMassNotificationMutation.mutateAsync(
        payload
      );
      if (response?.detail) {
        toast.success(response.detail);
      }
      router.push('/dashboard/messages');
    } catch (error: any) {
      toast.error(error.response.error);
    }
  };

  const handleCancel = () => {
    reset();
    router.push('/dashboard/messages');
  };

  return (
    <FormContainer title={strings.add_new_public_message}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFAutocomplete
              name="recivers"
              control={control}
              label={strings.recivers}
              placeholder={strings.selectRecivers}
              options={userOptions}
              variant="single"
              mode="light"
              isLoading={usersLoading}
            />

            <RHFInput
              name="message_subject"
              label={strings.messageSubject}
              control={control}
              placeholder="متن نوشته شده"
            />

            <RHFInput
              name="message_group"
              label={strings.generalMessageText}
              control={control}
              placeholder={strings.generalMessage}
            />

            <RHFAutocomplete
              name="category"
              control={control}
              label={strings.category}
              placeholder={strings.selectCategory}
              options={autocompleteCategoryOptions}
              variant="single"
              mode="light"
              isLoading={categoriesLoading}
            />

            <RhfDatePicker
              name="date_from"
              control={form.control}
              label={strings.sendDateFrom}
            />
            <RHFInput
              name="time_from"
              label={strings.sendTimeFrom}
              control={control}
              type="time"
            />
            <RhfDatePicker
              name="date_to"
              control={form.control}
              label={strings.sendDateTo}
            />
            <RHFInput
              name="time_to"
              label={strings.sendTimeTo}
              control={control}
              type="time"
            />
          </FormWrapper>

          <div className="max-w-[1376px] sm:mx-8 md:mx-16 lg:mx-6 xl:mx-[60px] flex justify-between items-center mt-10">
            <div className="space-x-4 flex items-center">
              <p className="text-sm font-medium text-gray-700">
                {strings.default_message}
              </p>
              <Switch
                checked={useDropdown}
                onCheckedChange={setUseDropdown}
                size="lg"
                dir="ltr"
                variant="secondary"
              />
            </div>

            <DropDownSelect
              options={dropdownCategoryOptions}
              value={selectedValue}
              onChange={(val) => setSelectedValue(val)}
              className="text-sm rounded-md"
              triggerSize="h-6 min-w-14"
            />
          </div>

          <div className="max-w-[1376px] sm:mx-8 md:mx-16 lg:mx-6 xl:mx-[60px] mt-6 flex space-x-6 scroll-auto overflow-x-auto">
            {useDropdown ? (
              filteredMessages.length > 0 ? (
                filteredMessages.map((item, index) => (
                  <DefaultMessage
                    key={item.id}
                    category_title={item.category?.name || 'دسته‌بندی نشده'}
                    title_number={index + 1}
                    message={item.message}
                    checked={selectedMessageIds.includes(item.id)}
                    onToggle={(checked) => toggleSelection(item.id, checked)}
                  />
                ))
              ) : (
                <p className="text-gray-500">پیامی یافت نشد</p>
              )
            ) : (
              <div className="w-full mr-1 mt-4">
                <CustomMessage
                  value={customMessageValues}
                  onChange={setCustomMessageValues}
                />
              </div>
            )}
          </div>

          <div className="flex gap-5 justify-center mt-12">
            <Button
              size="lg"
              isFilled
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'در حال ارسال...' : strings.submit}
            </Button>
            <Button size="lg" type="button" onClick={handleCancel}>
              {strings.cancel_operation}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddPublicMessagePage;
