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

const ChangePackageForm: FC = () => {
  const form = useForm();
  const title = 'تغییر بسته GPU کاربر';

  return (
    <Form {...form}>
      <FormContainer title={title}>
        <FormWrapper>
          <RHFAutocomplete
            control={form.control}
            name="brand"
            options={[]}
            placeholder="پیکربندی را انتخاب کنید."
            label="انتخاب پیکربندی*"
          />
          <RHFAutocomplete
            control={form.control}
            name="brand"
            options={[]}
            placeholder="دیسک را انتخاب کنید"
            label="انتخاب دیسک*"
          />
          <RHFAutocomplete
            control={form.control}
            name="brand"
            options={[]}
            placeholder="پلن را انتخاب کنید."
            label="انتخاب"
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

export default ChangePackageForm;
