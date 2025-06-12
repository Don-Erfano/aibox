'use client';

import { Button, Form, RHFAutocomplete, RHFInput } from '@aibox/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { FINANCE_ROUTES } from '@/routes';
import { FormContainer, FormWrapper } from '@/components';
import { useGetAllDepartments } from '@/services/department';
import { IAddFactor, usePostFactor } from '@/services/factor';
import { useGetAllUsers } from '@/services/user/user-lists';

import { addFactorSchema, factorStatusOptions } from './constants';
import { factorStrings } from './strings';

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
        <FormContainer title={factorStrings.addNewFactor}>
          <FormWrapper>
            <RHFAutocomplete
              control={control}
              name="user"
              label={factorStrings.user + '*'}
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
              label={factorStrings.price + '*'}
              placeholder={factorStrings.priceToToman}
              variant="sm"
            />
            <RHFInput
              control={control}
              name="discount_percent"
              label={factorStrings.discount}
              placeholder={factorStrings.percentageDiscount}
              type="number"
              variant="sm"
            />
            <RHFAutocomplete
              control={control}
              name="department"
              label={factorStrings.department}
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
              label={factorStrings.status}
              placeholder=""
              options={factorStatusOptions}
              h_size="sm"
            />

            <RHFInput
              control={control}
              type="date"
              name="created_at"
              label={factorStrings.createdDate}
              variant="sm"
            />
            <RHFInput
              control={control}
              type="date"
              name="due_date"
              label={factorStrings.dueDate}
              variant="sm"
            />
            <RHFInput
              control={control}
              name="description"
              label={factorStrings.description}
              variant="sm"
            />
          </FormWrapper>
          <div className="flex gap-5 justify-center">
            <Button size="lg" isFilled type="submit" disabled={isPending}>
              {isPending ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                factorStrings.submit
              )}
            </Button>
            <Button size="lg" type="button" onClick={() => router.back()}>
              {factorStrings.cancelAction}
            </Button>
          </div>
        </FormContainer>
      </form>
    </Form>
  );
};

export default AddFactorForm;
