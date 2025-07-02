import {
  Button,
  Form,
  FormLabel,
  Modal,
  RHFInput,
  RHFToggleSwitch,
} from '@aibox/ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { strings } from '@/constant';
import { useUpdateTransaction } from '@/services/transactions/transaction';
import { zodResolver } from '@hookform/resolvers/zod';

import { statusToggleItems, transactionModalFormSchema } from './constants';
import { TransactionModalFormType, TransactionModalProps } from './interface';

export const TransactionFormModal = ({
  modalState,
  toggleModal,
}: TransactionModalProps) => {
  const { show, transactionStatus, id, isEdit } = modalState;

  const form = useForm<TransactionModalFormType>({
    mode: 'onChange',
    resolver: zodResolver(transactionModalFormSchema),
  });
  const { control, handleSubmit, reset } = form;

  const { mutate, isPending } = useUpdateTransaction(isEdit);

  const onSubmit = (data: TransactionModalFormType) => {
    if (id) {
      mutate(
        { data, transaction_id: id },
        {
          onSuccess: () => {
            toggleModal({ show: false });
            reset();
          },
        }
      );
    }
  };

  useEffect(() => {
    reset({ status: transactionStatus });
  }, [reset, transactionStatus]);

  return (
    <Modal
      title={isEdit ? strings.editTransaction : strings.submitTransaction}
      open={show}
      onClose={() => toggleModal({ show: false })}
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-between">
            <FormLabel>{strings.transactionStatus}</FormLabel>
            <RHFToggleSwitch
              control={control}
              name="status"
              items={statusToggleItems}
              variant="onOff"
              size="fixed"
            />
          </div>
          <RHFInput
            control={control}
            name="track_id"
            label={strings.transactionNum}
            variant="sm"
          />
          <RHFInput
            control={control}
            name="description"
            label={strings.description}
            placeholder={strings.placeholderText}
            variant="lg"
          />
          <div className="flex justify-center items-center gap-5 mt-2">
            <Button type="submit" isFilled disabled={isPending}>
              {strings.confirm}
            </Button>
            <Button
              type="button"
              onClick={() => {
                toggleModal({ show: false });
                reset();
              }}
            >
              {strings.ignore}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
