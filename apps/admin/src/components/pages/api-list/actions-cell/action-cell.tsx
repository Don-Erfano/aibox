import clsx from 'clsx';
import Image from 'next/image';
import { z, ZodType } from 'zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row } from '@tanstack/react-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, CircleCheck, CircleX, Settings } from 'lucide-react';

import {
  IApiDetails,
  useGetApiList,
  usePostApproveApi,
  usePostDeprecatetApi,
  usePostRejectApi,
  usePostResolveProxyError,
} from '@/services';
import { Button, Form, Modal, RHFInput } from '@aibox/ui';

import { strings } from '@/constant';

const zodSchema: ZodType = z.object({
  title: z.string().min(1, { message: strings.titleIsRequired }),
  description: z.string().min(1, { message: strings.descriptionIsRequired }),
});

const ActionCell: FC<Row<IApiDetails>> = ({ original }) => {
  const [showModal, setShowModal] = useState<string>();
  const { refetch } = useGetApiList();

  const { mutateAsync: approveMutaion } = usePostApproveApi();
  const { mutateAsync: rejectMutation } = usePostRejectApi();
  const { mutateAsync: resolveErrorMutation } = usePostResolveProxyError();
  const { mutateAsync: deprecateMutation } = usePostDeprecatetApi();

  const form = useForm({
    resolver: zodResolver(zodSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleApprove = async () => {
    try {
      const response = await approveMutaion(original.id);
      if (response.data.code === 'SUCCESS') {
        setShowModal(undefined);
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResolveError = async () => {
    try {
      const response = await resolveErrorMutation(original.id);
      if (response.data.code === 'SUCCESS') {
        setShowModal(undefined);
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRejectApi = async () => {
    try {
      const response = await rejectMutation({
        id: original.id,
        data: {
          title: form.getValues('title'),
          description: form.getValues('description'),
        },
      });
      if (response.data.code === 'SUCCESS') {
        setShowModal(undefined);
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDepcrecateApi = async () => {
    try {
      const response = await deprecateMutation(original.id);
      if (response.data.code === 'SUCCESS') {
        setShowModal(undefined);
        refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal
        open={showModal === 'deprecate'}
        title=""
        headerIcon={
          <Image
            src="/images/warning-modal-icon.svg"
            alt="warning-icon"
            width={148}
            height={121}
          />
        }
        onOpenChange={() => setShowModal(undefined)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-center text-sm font-medium">
            {strings.areYouSure}
          </p>
          <p className="text-sm text-center font-normal">
            {strings.deprecateHintMessage}
          </p>
          <div className="flex justify-center gap-5 mt-4">
            <Button isFilled size="lg" onClick={handleDepcrecateApi}>
              {strings.deprecateAPI}
            </Button>
            <Button size="lg" onClick={() => setShowModal(undefined)}>
              {strings.cancel}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showModal === 'accept'}
        title={strings.approveApi}
        onOpenChange={() => setShowModal(undefined)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-center text-sm font-medium">
            {strings.areYouSure}
          </p>
          <p className="text-sm text-center font-normal">
            {strings.willShowInApiMarkert}
          </p>
          <div className="flex justify-center gap-5 mt-4">
            <Button isFilled size="lg" onClick={handleApprove}>
              {strings.approve}
            </Button>
            <Button size="lg" onClick={() => setShowModal(undefined)}>
              {strings.cancel}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showModal === 'reject'}
        title={strings.rejectAPI}
        onOpenChange={() => setShowModal(undefined)}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRejectApi)}
            className="flex flex-col gap-6"
          >
            <RHFInput
              control={form.control}
              name="title"
              label={strings.rejectTitle}
            />
            <div className="flex flex-col gap-2 relative">
              <span
                className={clsx('text-zinc-600 text-sm', {
                  '!text-red-600': form.formState.errors.description?.message,
                })}
              >
                {strings.description}
              </span>
              <textarea
                {...form.register('description')}
                placeholder={strings.additionalDescription}
                className={clsx('outline rounded p-3', {
                  'outline-red-600': form.formState.errors.description?.message,
                })}
                rows={4}
              />
              <span className="absolute text-red-600 text-xs font-light right-2 top-full mt-1">
                {form.formState.errors.description?.message}
              </span>
            </div>
            <div className="flex justify-center gap-5 mt-4">
              <Button isFilled size="lg" type="submit">
                {strings.rejectAPI}
              </Button>
              <Button size="lg" onClick={() => setShowModal(undefined)}>
                {strings.cancel}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
      <Modal
        open={showModal === 'error'}
        title="گزارش رفع مشکل"
        onOpenChange={() => setShowModal(undefined)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-center text-sm font-medium">آیا مطمئن هستید؟</p>
          <p className="text-sm text-center font-normal">
            با زدن دکمه «تأیید»، به تمامی استفاده کنندگان سرویس شما، رفع مشکل
            سرویس اطلاع داده خواهد شد.
          </p>
          <div className="flex justify-center gap-5 mt-4">
            <Button isFilled size="lg" onClick={handleResolveError}>
              تأیید
            </Button>
            <Button size="lg" onClick={() => setShowModal(undefined)}>
              انصراف
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex justify-end gap-2 max-w-40">
        {original.status === 'WAITING' && (
          <Button
            variant="ghost"
            size="icon"
            tooltip={strings.approveApi}
            onClick={() => setShowModal('accept')}
          >
            <CircleCheck />
          </Button>
        )}
        {(original.status === '' || original.status === 'WAITING') && (
          <Button
            variant="ghost"
            size="icon"
            tooltip={strings.rejectAPI}
            onClick={() => setShowModal('reject')}
          >
            <CircleX />
          </Button>
        )}
        {original.status === 'PROXY_ERROR' && (
          <Button
            variant="ghost"
            size="icon"
            tooltip={strings.reportResloveError}
            onClick={() => setShowModal('error')}
          >
            <Settings />
          </Button>
        )}
        {(original.status === 'ACCEPTED' ||
          original.status === 'WAITING' ||
          original.status === 'PROXY_ERROR') && (
          <Button
            variant="ghost"
            size="icon"
            tooltip={strings.deprecateAPI}
            onClick={() => setShowModal('deprecate')}
          >
            <Ban />
          </Button>
        )}
      </div>
    </>
  );
};

export default ActionCell;
