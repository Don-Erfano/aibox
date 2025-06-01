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
import Image from 'next/image';

const zodSchema: ZodType = z.object({
  title: z.string().min(1, { message: 'عنوان اجباری‌ است' }),
  description: z.string().min(1, { message: 'توضیحات اجباری‌ است' }),
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
          <p className="text-center text-sm font-medium">آیا مطمئن هستید؟</p>
          <p className="text-sm text-center font-normal">
            پس از منقضی شدن، دیگر امکان استفاده از این نسخه برای کاربران وجود
            ندارد.
          </p>
          <div className="flex justify-center gap-5 mt-4">
            <Button isFilled size="lg" onClick={handleDepcrecateApi}>
              منقضی کردن API
            </Button>
            <Button size="lg" onClick={() => setShowModal(undefined)}>
              انصراف
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showModal === 'accept'}
        title="تأیید کردن API"
        onOpenChange={() => setShowModal(undefined)}
      >
        <div className="flex flex-col gap-4">
          <p className="text-center text-sm font-medium">آیا مطمئن هستید؟</p>
          <p className="text-sm text-center font-normal">
            با تأیید کردن، API در مارکت منتشر خواهد شد.
          </p>
          <div className="flex justify-center gap-5 mt-4">
            <Button isFilled size="lg" onClick={handleApprove}>
              تأیید
            </Button>
            <Button size="lg" onClick={() => setShowModal(undefined)}>
              انصراف
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showModal === 'reject'}
        title="مردود کردن API"
        onOpenChange={() => setShowModal(undefined)}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRejectApi)}
            className="flex flex-col gap-5"
          >
            <RHFInput
              control={form.control}
              name="title"
              placeholder="عنوان پیام به ارائه دهنده"
            />
            <div className="flex flex-col gap-2">
              <span className="text-zinc-600 text-sm">توضیحات</span>
              <textarea
                {...form.register('description')}
                placeholder="توضیحات بیشتر را وارد کنید."
                className="outline rounded p-3"
                rows={4}
              />
            </div>
            <div className="flex justify-center gap-5 mt-4">
              <Button isFilled size="lg" type="submit">
                تأیید
              </Button>
              <Button size="lg" onClick={() => setShowModal(undefined)}>
                مردود کردن API
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

      <div className="flex justify-end gap-2">
        {original.status === 'WAITING' && (
          <Button
            variant="ghost"
            size="icon"
            tooltip="تایید کردن"
            onClick={() => setShowModal('accept')}
          >
            <CircleCheck />
          </Button>
        )}
        {(original.status === '' || original.status === 'WAITING') && (
          <Button
            variant="ghost"
            size="icon"
            tooltip="رد کردن"
            onClick={() => setShowModal('reject')}
          >
            <CircleX />
          </Button>
        )}
        {original.status === 'PROXY_ERROR' && (
          <Button
            variant="ghost"
            size="icon"
            tooltip="گزارش رفع مشکل"
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
            tooltip="منقضی کردن"
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
