'use client';

import { FC, useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import DropDownSelect from '@/components/pages/messages/components/drop-down-select/drop-down-select';
import { DefaultMessage } from '@/components/pages/messages/components/default-message';
import {
  Button,
  Form,
  RHFAutocomplete,
  RHFInput,
  DatePicker,
  Switch,
  toast,
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
} from '@/services/messages/public-messages';
import { useGetAllUserList } from '@/services/user/user-all';

import { strings } from '@/constant';
import { CustomMessage } from '@/components/pages/messages/components/custom-message';

interface MessageItem {
  id: string;
  category_title: string;
  title_number: number;
  message: string;
}

const defaultMessages: MessageItem[] = [
  {
    id: 'msg1',
    category_title: 'عمومی',
    title_number: 1,
    message:
      'این یک پیام عمومی است. شما می‌توانید این متن را برای تست نمایش پیام جایگزین کنید.',
  },
  {
    id: 'msg2',
    category_title: 'عمومی',
    title_number: 2,
    message:
      'این یک پیام مالی است. محتوا می‌تواند حاوی توصیه‌های مالی یا اطلاعیه‌های بانکی باشد.',
  },
  {
    id: 'msg3',
    category_title: 'عمومی',
    title_number: 3,
    message:
      'این پیام تبلیغاتی است. از این فیلد برای نمایش تخفیف‌ها یا اطلاعیه‌های تبلیغاتی استفاده کنید.',
  },
  {
    id: 'msg4',
    category_title: 'عمومی',
    title_number: 4,
    message:
      'این پیام دعوت نامه است. می‌توانید از آن برای دعوت به همایش یا رویداد استفاده کنید.',
  },
  {
    id: 'msg5',
    category_title: 'عمومی',
    title_number: 5,
    message:
      'این پیام دعوت نامه است. می‌توانید از آن برای دعوت به همایش یا رویداد استفاده کنید.',
  },
  {
    id: 'msg6',
    category_title: 'عمومی',
    title_number: 6,
    message:
      'این پیام دعوت نامه است. می‌توانید از آن برای دعوت به همایش یا رویداد استفاده کنید.',
  },
];

const combineDateTime = (date: string, time: string) => {
  const formattedDate = date.replace(/\//g, '-');
  return `${formattedDate} ${time}`;
};

const AddPublicMessagePage: FC = () => {
  const router = useRouter();

  const createMassNotificationMutation = useCreateMassNotification();
  const {
    data: categories = { data: { category: [] } },
    isLoading: categoriesLoading,
  } = useGetMassNotificationCategories();
  const { users, isLoading: usersLoading } = useGetAllUserList();

  const form = useForm<PublicMessageSchemaType>({
    resolver: zodResolver(publicMessageSchema),
    defaultValues,
  });

  const { watch, control, handleSubmit, reset } = form;
  const watchedRecivers = watch('recivers');
  const watchedCategory = watch('category');

  useEffect(() => {
    console.log('selected recivers:', watchedRecivers);
  }, [watchedRecivers]);

  useEffect(() => {
    console.log('selected category:', watchedCategory);
  }, [watchedCategory]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [useDropdown, setUseDropdown] = useState(true);
  const [customText] = useState('');

  const userOptions = [
    { value: 'all', label: 'همه کاربران' },
    ...(users?.map((user) => ({
      value: user.id,
      label: user.email,
    })) || []),
  ];

  const categoryOptions =
    categories?.data?.category?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];
  const toggleSelection = (id: string, isNowChecked: boolean) => {
    setSelectedIds((prev) =>
      isNowChecked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)
    );
  };

  const onSubmit: SubmitHandler<PublicMessageSchemaType> = async (data) => {
    console.log('Form submit data:', data);
    try {
      let userString = 'all';
      if (data.recivers && data.recivers.value !== 'all') {
        userString = data.recivers.value;
      }

      if (!data.category) {
        toast.error('لطفاً یک دسته‌بندی را انتخاب کنید');
        return;
      }

      const from_time = combineDateTime(data.date_from, data.time_from);
      const to_time = combineDateTime(data.date_to, data.time_to);

      const messageContent = useDropdown
        ? selectedIds
            .map((id) => {
              const selectedMessage = defaultMessages.find(
                (msg) => msg.id === id
              );
              return selectedMessage?.message || '';
            })
            .join('\n')
        : customText;

      const payload: ICreateMassNotificationRequest = {
        user: userString,
        category: data.category,
        name: data.message_group || data.message_subject,
        from_time,
        to_time,
        subject: data.message_subject,
        message: messageContent,
        message_text: messageContent,
        notif_type: 'in_app',
      };
      await createMassNotificationMutation.mutateAsync(payload);

      toast.success('پیام عمومی با موفقیت ایجاد شد');
      router.push('/dashboard/messages');
    } catch (error) {
      console.error('Error creating mass notification:', error);
      toast.error('خطا در ایجاد پیام عمومی');
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
              options={[
                { value: 'all_users', label: 'همه کاربران' },
                { value: 'group_a', label: 'گروه A' },
              ]}
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
              options={[
                { value: 'selected_category', label: 'گزینه انتخاب شده' },
                { value: 'finance', label: 'مالی' },
              ]}
              variant="single"
              mode="light"
              isLoading={categoriesLoading}
            />

            <Controller
              control={control}
              name="date_from"
              render={({ field }) => (
                <DatePicker
                  label={strings.sendDateFrom}
                  value={[field.value]}
                  onChange={field.onChange}
                />
              )}
            />
            <RHFInput
              name="time_from"
              label={strings.sendTimeFrom}
              control={control}
              type="time"
            />
            <Controller
              control={control}
              name="date_to"
              render={({ field }) => (
                <DatePicker
                  label={strings.sendDateTo}
                  value={[field.value]}
                  onChange={field.onChange}
                />
              )}
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
              options={[
                { value: 'all', label: strings.all },
                { value: 'public', label: strings.general },
                { value: 'financial', label: strings.accounting },
                { value: 'commercial', label: strings.advertising },
                { value: 'invitation', label: strings.invite },
              ]}
              value={selectedValue}
              onChange={(val) => setSelectedValue(val)}
              className="text-sm rounded-md"
              triggerSize="h-6 min-w-14"
            />
          </div>

          <div className="max-w-[1376px] sm:mx-8 md:mx-16 lg:mx-6 xl:mx-[60px] mt-6 flex space-x-6 scroll-auto overflow-x-auto">
            {useDropdown ? (
              defaultMessages.map((item) => (
                <DefaultMessage
                  key={item.id}
                  category_title={item.category_title}
                  title_number={item.title_number}
                  message={item.message}
                  checked={selectedIds.includes(item.id)}
                  onToggle={(checked) => toggleSelection(item.id, checked)}
                />
              ))
            ) : (
              <div className="w-full mr-1 mt-4">
                <CustomMessage value={customText} onChange={setCustomText} />
              </div>
            )}
          </div>

          <div className="flex gap-5 justify-center mt-12">
            <Button size="lg" isFilled type="submit">
              {strings.submit}
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
