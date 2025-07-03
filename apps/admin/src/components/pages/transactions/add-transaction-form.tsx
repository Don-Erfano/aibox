'use client';

import { Button, Form, RHFAutocomplete, RHFInput } from '@aibox/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { FormContainer, FormWrapper } from '@/components/templates';
import { strings } from '@/constant';

import { kindOptions, statusOptions, titleOptions } from './constants';
import { AddTransaction } from './interface';

export const AddTransactionForm = () => {
  const router = useRouter();

  const form = useForm<AddTransaction>({
    mode: 'onChange',
  });
  const { control, handleSubmit } = form;

  const isPending = false;

  const onSubmit = (data: AddTransaction) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer title={strings.createNewTransaction}>
          <FormWrapper>
            <RHFAutocomplete
              control={control}
              name="kind"
              label={`${strings.transactionType}*`}
              placeholder=""
              options={kindOptions}
              h_size="sm"
            />

            <RHFAutocomplete
              control={control}
              name="title"
              label={`${strings.title}*`}
              placeholder=""
              options={titleOptions}
              h_size="sm"
            />

            <RHFInput
              control={control}
              name="amount"
              type="number"
              label={`${strings.amount}*`}
              placeholder={strings.amountToToman}
              variant="sm"
            />

            <RHFAutocomplete
              control={control}
              name="status"
              label={`${strings.status}*`}
              placeholder=""
              options={statusOptions}
              h_size="sm"
            />

            <RHFInput
              control={control}
              name="description"
              label={`${strings.description}*`}
              variant="sm"
            />
          </FormWrapper>
          <div className="flex gap-5 justify-center">
            <Button size="lg" isFilled type="submit" disabled={isPending}>
              {strings.submit}
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
