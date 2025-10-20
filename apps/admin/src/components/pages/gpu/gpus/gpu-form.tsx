'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';

import { Button, Form, RHFAutocomplete, RHFInput, Toggle } from '@aibox/ui';

import { strings } from '@/constant';
import { FormContainer, FormWrapper } from '@/components/templates';

const GpuForm: FC = () => {
  const form = useForm();
  const pathname = usePathname();
  const title = pathname.includes('edit')
    ? 'ویرایش GPU - نام GPU'
    : 'تعریف GPU جدید';
  return (
    <Form {...form}>
      <FormContainer title={title}>
        <FormWrapper>
          <RHFInput name="price" label="مدل*" />
          <RHFAutocomplete
            control={form.control}
            name="brand"
            options={[]}
            placeholder="برند را انتخاب کنید"
            label="برند"
          />
          <RHFInput name="price" label="Reliability*" />
          <RHFInput name="price" label="رم*" />
          <RHFInput name="price" label="تعداد هسته Cuda*" />
          <RHFInput name="price" label="ساعت استفاده رایگان" />
          <RHFInput
            name="price"
            label="بازه استفاده رایگان"
            placeholder="محدودیت زمانی که کاربر‍‌ می‌تواند از قابلیت رایگان خود استفاده کند."
          />
          <div className="flex flex-col gap-4">
            <span className="text-sm text-zinc-600">{strings.status}*</span>
            <Toggle
              size="fixed"
              items={[
                { label: 'فعال', value: 'active' },
                { label: 'غیرفعال', value: 'deactive' },
              ]}
              value={form.getValues('is_active') || 'active'}
              onValueChange={(e: any) => form.setValue('is_active', e)}
            />
          </div>
        </FormWrapper>
        <div className="flex justify-center w-full gap-5">
          <Button isFilled>ثبت</Button>
          <Button>لغو عملیات</Button>
        </div>
      </FormContainer>
    </Form>
  );
};

export default GpuForm;
