'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';

import { Button, Form, RHFInput } from '@aibox/ui';

import { FormContainer, FormWrapper } from '@/components/templates';

const MotherboardForm: FC = () => {
  const form = useForm();
  const pathname = usePathname();
  const title = pathname.includes('edit')
    ? 'ویرایش مادربرد - نام مادربرد'
    : 'تعریف مادربرد جدید';
  return (
    <Form {...form}>
      <FormContainer title={title}>
        <FormWrapper>
          <RHFInput name="price" label="مدل*" />

          <RHFInput name="price" label="رم*" />
          <RHFInput name="price" label="تعداد هسته Cuda*" />
        </FormWrapper>
        <div className="flex justify-center w-full gap-5">
          <Button isFilled>ثبت</Button>
          <Button>لغو عملیات</Button>
        </div>
      </FormContainer>
    </Form>
  );
};

export default MotherboardForm;
