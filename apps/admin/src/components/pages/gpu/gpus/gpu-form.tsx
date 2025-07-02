'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Form,
  RHFAutocomplete,
  RHFInput,
  ToggleGroup,
} from '@aibox/ui';

import { FormContainer, FormWrapper } from '@/components/templates';

const GpuForm: FC = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <FormContainer title="title">
        <FormWrapper>
          <RHFInput name="price" label="قیمت" />
          <RHFAutocomplete
            control={form.control}
            name="brand"
            options={[]}
            placeholder="برند را انتخاب کنید"
            label="برند"
          />
          <RHFInput name="price" label="*Reliability" />
          <RHFInput name="price" label="رم*" />
          <RHFInput name="price" label="تعداد هسته Cuda*" />
          <RHFInput name="price" label="ساعت استفاده رایگان" />
          <RHFInput
            name="price"
            label="بازه استفاده رایگان"
            placeholder="محدودیت زمانی که کاربر‍‌ می‌تواند از قابلیت رایگان خود استفاده کند."
          />
          <ToggleGroup
            items={[
              { label: 'فعال', value: 'active' },
              { label: 'غیرفعال', value: 'deactive' },
            ]}
            onValueChange={(e) => console.log(e)}
            value="active"
          />
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
