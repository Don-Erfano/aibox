import { Button, Form, RHFInput } from '@aibox/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormContainer, FormWrapper } from '@/components/templates';
import { strings } from '@/constant';
import { FINANCE_ROUTES } from '@/routes';
import {
  useAddNewGiftCode,
  useGetGiftCode,
  useUpdateGiftCode,
} from '@/services/gift-code';

import { giftCodeSchema } from './constants';
import { GiftCodeFields, GiftCodeFormProps } from './interface';

export const GiftCodeForm: React.FC<GiftCodeFormProps> = ({ giftCodeId }) => {
  const isEdit = !!giftCodeId;

  const form = useForm<GiftCodeFields>({
    mode: 'onChange',
    resolver: zodResolver(giftCodeSchema),
  });
  const { control, handleSubmit, reset } = form;

  const router = useRouter();

  const { data: giftCode, isLoading } = useGetGiftCode(giftCodeId);

  const { mutate: addGiftCode, isPending: isAddGiftCodePending } =
    useAddNewGiftCode();
  const { mutate: updateGiftCode, isPending: isUpdateGiftCodePending } =
    useUpdateGiftCode();

  const isPending = isAddGiftCodePending || isUpdateGiftCodePending;

  const onSubmit = (data: GiftCodeFields) => {
    isEdit
      ? updateGiftCode(
          { id: giftCodeId, ...data },
          { onSuccess: () => router.push(FINANCE_ROUTES.GIFT_CODE) }
        )
      : addGiftCode(data, {
          onSuccess: () => router.push(FINANCE_ROUTES.GIFT_CODE),
        });
  };

  useEffect(() => {
    if (isEdit) reset(giftCode);
  }, [isEdit, giftCode, reset]);

  if (isEdit && isLoading) return <p>Loading...</p>;

  return (
    <FormContainer
      title={
        isEdit
          ? `${strings.editGiftCode} - ${giftCode?.code}`
          : strings.addNewGiftCode
      }
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <RHFInput
              control={control}
              name="code"
              label={`${strings.codeTitle}*`}
              type="text"
              variant="sm"
            />

            <RHFInput
              control={control}
              type="number"
              name="amount"
              label={`${strings.tomanAmountValue}*`}
              variant="sm"
            />
            <RHFInput
              control={control}
              type="number"
              name="allowed_count_use"
              label={strings.totalCapacity}
              variant="sm"
            />
            <RHFInput
              control={control}
              type="date"
              name="expired_time"
              label={`${strings.expiredDate}*`}
              variant="sm"
            />
          </FormWrapper>
          <div className="mt-12 flex gap-5 justify-center">
            <Button size="lg" isFilled type="submit" disabled={isPending}>
              {isEdit ? strings.submitChanges : strings.submit}
            </Button>
            <Button size="lg" type="button" onClick={() => router.back()}>
              {isEdit ? strings.cancel : strings.cancelAction}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};
