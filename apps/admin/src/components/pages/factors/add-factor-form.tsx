'use client';

import { Button, Form, RHFAutocomplete, RHFInput } from '@aibox/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { strings } from '@/constant';
import { FINANCE_ROUTES } from '@/routes';
import { FormContainer, FormWrapper } from '@/components';
import { useGetAllDepartments } from '@/services/department';
import { IAddFactor, usePostFactor } from '@/services/factor';
import { useGetAllUsers } from '@/services/user/user-lists';

import { addFactorSchema, factorStatusOptions } from './constants';

const AddFactorForm: FC = () => {
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
        setTimeout(() => router.push(FINANCE_ROUTES.FACTORS), 1500);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer title={strings.addNewFactor}>
          <FormWrapper>
            <RHFAutocomplete
              control={control}
              name="user"
              label={strings.user + '*'}
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
              label={strings.price + '*'}
              placeholder={strings.priceToToman}
              variant="sm"
            />
            <RHFInput
              control={control}
              name="discount_percent"
              label={strings.discount}
              placeholder={strings.percentageDiscount}
              type="number"
              variant="sm"
            />
            <RHFAutocomplete
              control={control}
              name="department"
              label={strings.department}
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
              label={strings.status}
              placeholder=""
              options={factorStatusOptions}
              h_size="sm"
            />

            <RHFInput
              control={control}
              type="date"
              name="created_at"
              label={strings.createdDate}
              variant="sm"
            />
            <RHFInput
              control={control}
              type="date"
              name="due_date"
              label={strings.dueDate}
              variant="sm"
            />
            <RHFInput
              control={control}
              name="description"
              label={strings.description}
              variant="sm"
            />
          </FormWrapper>
          <div className="flex gap-5 justify-center">
            <Button size="lg" isFilled type="submit" disabled={isPending}>
              {isPending ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                strings.submit
              )}
            </Button>
            <Button size="lg" type="button" onClick={() => router.back()}>
              {strings.cancelAction}
            </Button>
          </div>
        </FormContainer>
      </form>
    </Form>
  );
};

export default AddFactorForm;
