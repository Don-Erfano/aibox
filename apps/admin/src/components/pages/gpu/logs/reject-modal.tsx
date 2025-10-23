'use client';

import { useForm } from 'react-hook-form';

import { Button, Form, Modal, RhfTextarea } from '@aibox/ui';
import { strings } from '@/constant';
import { useApporvePackage } from '@/services/gpu';
import { zodResolver } from '@hookform/resolvers/zod';

import { rejectFormDefaultValues, rejectFormSchema } from './constants';
import { ApprovalModalState, RejectForm } from './interface';

export const RejectModal = ({
  modalState,
  toggleModal,
}: ApprovalModalState) => {
  const { show, id } = modalState;

  const form = useForm({
    resolver: zodResolver(rejectFormSchema),
    defaultValues: rejectFormDefaultValues,
  });
  const { control, reset, handleSubmit } = form;

  const { mutate, isPending } = useApporvePackage();

  const onCancel = () => {
    toggleModal({ show: false });
    reset();
  };

  const onSubmit = (data: RejectForm) => {
    if (id)
      mutate(
        {
          id,
          data: {
            is_approved: false,
            message: data.message,
          },
        },
        {
          onSuccess: () => {
            toggleModal({ show: false });
          },
        }
      );
  };

  return (
    <Modal open={show} onClose={onCancel} title={strings.rejecting}>
      <div className="flex w-full flex-col items-center gap-4">
        <span className="text-sm/6 font-medium text-indigo-950">
          {strings.areYouSure}
        </span>
        <span className="text-sm/6 font-normal text-neutral-900">
          {strings.rejectUserPackageRequestDescription}
        </span>
      </div>
      <Form {...form}>
        <form
          className="mt-4"
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          //@ts-ignore
          onSubmit={handleSubmit(onSubmit)}
        >
          <RhfTextarea
            label={`${strings.description}*`}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            control={control}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            name="message"
            className="max-h-[300px] min-h-[100px]"
          />
          <div className="mt-8 flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              isFilled
              loading={isPending}
              disabled={isPending}
              type="submit"
            >
              {strings.rejecting}
            </Button>
            <Button size="lg" onClick={onCancel} disabled={isPending}>
              {strings.cancel}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
