'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Form, RHFAutocomplete, ToggleSwitch } from '@aibox/ui';

import { strings } from '@/constant';
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
          <div className="flex flex-col gap-4">
            <span className="text-sm text-zinc-600">{strings.status}*</span>
            <ToggleSwitch
              size="fixed"
              items={[
                { label: 'فعال', value: 'active' },
                { label: 'غیرفعال', value: 'deactive' },
              ]}
              value={form.getValues('is_active')}
              onValueChange={(e) => form.setValue('is_active', e)}
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

export default ChangePackageForm;
