'use client';

import { Button, Form, RHFAutocomplete, RHFInput } from '@aibox/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormContainer, FormWrapper } from '@/components';
import { FINANCE_ROUTES } from '@/routes';
import { useGetAllDepartments } from '@/services/department';
import {
  IAddFactor,
  useGetFactor,
  usePostFactor,
  useUpdateFactor,
} from '@/services/factor';
import { useGetAllUsers } from '@/services/user/user-lists';

import { addFactorSchema, factorStatusOptions } from './constants';
import { factorStrings } from './strings';

export const FactorForm: FC<{ factorId?: string }> = ({ factorId }) => {
  const isEdit = !!factorId;

  const router = useRouter();
  const { mutate: addFactor, isPending: isAddPending } = usePostFactor();
  const { mutate: updateFactor, isPending: isUpdatePending } =
    useUpdateFactor();
  const isPending = isAddPending || isUpdatePending;

  const { data: factor, isLoading } = useGetFactor(factorId);
  const { data: allUsers } = useGetAllUsers();
  const { data: allDepartments } = useGetAllDepartments();

  const form = useForm<IAddFactor>({
    resolver: zodResolver(addFactorSchema),
    mode: 'onChange',
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = (data: IAddFactor) => {
    const formData = Object.fromEntries(
      Object.entries(data).filter(([_, val]) => val)
    ) as IAddFactor;

    isEdit
      ? updateFactor(
          { id: factorId, ...formData },
          { onSuccess: () => router.push(FINANCE_ROUTES.FACTORS) }
        )
      : addFactor(formData, {
          onSuccess: () => router.push(FINANCE_ROUTES.FACTORS),
        });
  };

  useEffect(() => {
    if (isEdit) {
      const resetValues: Partial<IAddFactor> = {
        user: factor?.user.id,
        price: factor?.price,
        discount_percent: factor?.discount_percent,
        status: factor?.status,
        description: factor?.description,
        due_date: factor?.pay_date,
        created_at: factor?.created_at,
      };

      if (factor?.department) resetValues.department = factor.department.id;

      reset(resetValues);
    }
  }, [isEdit, reset, factor]);

  if (isEdit && isLoading) return <p>Loading...</p>;

  return (
    <FormContainer
      title={
        isEdit
          ? `${factorStrings.editFactor} ${factor?.num}#`
          : factorStrings.addNewFactor
      }
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex gap-5 justify-center mt-12">
            <Button size="lg" isFilled type="submit" disabled={isPending}>
              {isEdit ? factorStrings.submitChanges : factorStrings.submit}
            </Button>
            <Button size="lg" type="button" onClick={() => router.back()}>
              {isEdit ? factorStrings.cancel : factorStrings.cancelAction}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};
