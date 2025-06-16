'use client';

import { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import DropDownSelect from '@/components/pages/messages/public-message/add-public-message/components/drop-down-select/drop-down-select';
import { DefaultMessage } from '@/components/pages/messages/public-message/add-public-message/components/default-message';
import {
  Button,
  Form,
  RHFAutocomplete,
  RHFInput,
  DatePicker,
  Switch,
} from '@aibox/ui';
import { FormContainer, FormWrapper } from '@/components';
import { MessagesString } from '@/components/pages/messages/string';
import { TicketingString } from '@/components/pages/ticketing/ticketing-list/string';
import {
  defaultValues,
  publicMessageSchema,
  PublicMessageSchemaType,
} from './schema';
import { CustomMessage } from '@/components/pages/messages/public-message/add-public-message/components/custom-message';

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

const AddPublicMessagePage: FC = () => {
  const router = useRouter();

  const form = useForm<PublicMessageSchemaType>({
    resolver: zodResolver(publicMessageSchema),
    defaultValues,
  });

  const { watch, control, handleSubmit, setValue, reset } = form;

  const [selectedValue, setSelectedValue] = useState<string | undefined>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [useDropdown, setUseDropdown] = useState(true);
  const [customText, setCustomText] = useState('');

  const toggleSelection = (id: string, isNowChecked: boolean) => {
    setSelectedIds((prev) =>
      isNowChecked ? [...new Set([...prev, id])] : prev.filter((x) => x !== id)
    );
  };

  const onSubmit: SubmitHandler<PublicMessageSchemaType> = (data) => {
    console.log('Submitted Form Data:', {
      ...data,
      selectedMessages: selectedIds,
      defaultMessageType: useDropdown ? 'preset' : 'custom',
      customMessage: useDropdown ? undefined : customText,
    });
  };

  const handleCancel = () => {
    reset();
    router.push('/dashboard/messages');
  };

  return (
    <FormContainer title={MessagesString.add_new_public_message}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFAutocomplete
              name="recivers"
              control={control}
              label="دریافت کنندگان *"
              placeholder="انتخاب دریافت کننده"
              options={[
                { value: 'all_users', label: 'همه کاربران' },
                { value: 'group_a', label: 'گروه A' },
              ]}
              variant="single"
              mode="light"
            />

            <RHFInput
              name="message_subject"
              label="موضوع پیام *"
              control={control}
              placeholder="متن نوشته شده"
            />

            <RHFInput
              name="message_group"
              label="نام پیام گروهی"
              control={control}
              placeholder="پیام گروهی"
            />

            <RHFAutocomplete
              name="category"
              control={control}
              label="دسته‌بندی *"
              placeholder="انتخاب دسته‌بندی"
              options={[
                { value: 'selected_category', label: 'گزینه انتخاب شده' },
                { value: 'finance', label: 'مالی' },
              ]}
              variant="single"
              mode="light"
            />

            <Controller
              control={control}
              name="date_from"
              render={({ field }) => (
                <DatePicker
                  label="تاریخ ارسال از *"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <RHFInput
              name="time_from"
              label="ساعت ارسال از"
              control={control}
              type="time"
            />
            <Controller
              control={control}
              name="date_to"
              render={({ field }) => (
                <DatePicker
                  label="تاریخ ارسال تا *"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <RHFInput
              name="time_to"
              label="ساعت ارسال تا"
              control={control}
              type="time"
            />
          </FormWrapper>

          <div className="max-w-[1376px] sm:mx-8 md:mx-16 lg:mx-6 xl:mx-[60px] flex justify-between items-center mt-10">
            <div className="space-x-4 flex items-center">
              <p className="text-sm font-medium text-gray-700">
                {MessagesString.default_message}
              </p>
              <Switch
                checked={useDropdown}
                onCheckedChange={setUseDropdown}
                withIcon
                size="lg"
                variant="primary"
              />
            </div>
            <DropDownSelect
              options={[
                { value: 'all', label: 'همه' },
                { value: 'public', label: 'عمومی' },
                { value: 'financial', label: 'مالی' },
                { value: 'commercial', label: 'تبلیغاتی' },
                { value: 'invitation', label: 'دعوت نامه' },
              ]}
              value={selectedValue}
              onChange={(val) => setSelectedValue(val)}
              className="text-sm rounded-md"
              triggerSize="h-6 min-w-14"
            />
          </div>

          <div className="max-w-[1376px] sm:mx-8 md:mx-16 lg:mx-6 xl:mx-[60px] mt-6 flex space-x-6 overflow-x-auto">
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
              <CustomMessage />
            )}
          </div>

          <div className="flex gap-5 justify-center mt-12">
            <Button size="lg" isFilled type="submit">
              {TicketingString.submit}
            </Button>
            <Button size="lg" type="button" onClick={handleCancel}>
              {TicketingString.cancel_operation}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddPublicMessagePage;
