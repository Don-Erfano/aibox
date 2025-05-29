'use client';

import { Button, Form, RHFAutocomplete, RHFInput } from '@aibox/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { FormContainer, FormWrapper } from '@/components';
import {
  IAddFactor,
  useGetAllDepartments,
  useGetAllUsers,
  usePostFactor,
} from '@/services/factor';

import { addFactorSchema, factorStatusOptions } from './constants';

const AddFactorForm = () => {
  const router = useRouter();
  const { mutate, isPending } = usePostFactor();

  const { data: allUsers } = useGetAllUsers();
  const { data: allDepartments } = useGetAllDepartments();

  const form = useForm<IAddFactor>({
    resolver: zodResolver(addFactorSchema),
    mode: 'onChange',
  });
  const { control, handleSubmit } = form;

  const onSubmit = (data: IAddFactor) => {
    const formData = Object.fromEntries(
      Object.entries(data).filter(([_, val]) => val)
    ) as IAddFactor;

    mutate(formData, {
      onSuccess: () => {
        setTimeout(() => router.push('/dashboard/factors'), 1500);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer title="افزودن فاکتور جدید">
          <FormWrapper>
            <RHFAutocomplete
              control={control}
              name="user"
              label="کاربر*"
              placeholder=""
              options={
                allUsers?.data.data.users.map((user) => ({
                  label: user.email,
                  value: user.id,
                })) ?? []
              }
              h_size="sm"
            />
            <RHFInput
              control={control}
              name="price"
              type="number"
              label="قیمت*"
              placeholder="قیمت به تومان"
              variant="sm"
            />
            <RHFInput
              control={control}
              name="discount_percent"
              label="تخفیف"
              placeholder="تخفیف به درصد"
              type="number"
              variant="sm"
            />
            <RHFAutocomplete
              control={control}
              name="department"
              label="دپارتمان"
              placeholder=""
              options={
                allDepartments?.data.data.department.map((department) => ({
                  label: department.title,
                  value: department.id,
                })) ?? []
              }
              h_size="sm"
            />
            <RHFAutocomplete
              control={control}
              name="status"
              label="وضعیت"
              placeholder=""
              options={factorStatusOptions}
              h_size="sm"
            />

            <RHFInput
              control={control}
              type="date"
              name="created_at"
              label="تاریخ فاکتور"
              variant="sm"
            />
            <RHFInput
              control={control}
              type="date"
              name="due_date"
              label="تاریخ سررسید"
              variant="sm"
            />
            <RHFInput
              control={control}
              name="description"
              label="توضیحات"
              variant="sm"
            />
          </FormWrapper>
          <div className="flex gap-5 justify-center">
            <Button size="lg" isFilled type="submit" disabled={isPending}>
              {isPending ? <LoaderIcon className="animate-spin" /> : 'ثبت'}
            </Button>
            <Button size="lg" type="button" onClick={() => router.back()}>
              لغو عملیات
            </Button>
          </div>
        </FormContainer>
      </form>
    </Form>
  );
};

export default AddFactorForm;
