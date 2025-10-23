'use client';

import { FC, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import {
  Button,
  Form,
  FormContainer,
  FormWrapper,
  RHFAutocomplete,
  RHFToggle,
  toast,
} from '@aibox/ui';

import { strings } from '@/constant';
import {
  IUpdatePackageRequestPayload,
  useGetAllGpuMotherboards,
  useGetDisksList,
  useGetGpuLogsList,
  useGetPackageById,
  useGetPlansList,
  useUpdateUserPackage,
} from '@/services/gpu';
import axios from 'axios';
import { GPU_ROUTES } from '@/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePackageFormSchema } from './constants';

const ChangePackageForm: FC = () => {
  const form = useForm({
    resolver: zodResolver(changePackageFormSchema),
  });
  const { id } = useParams();
  const { data, error } = useGetPackageById(id as string);
  const { refetch } = useGetGpuLogsList();
  const { data: gpuMotherboards } = useGetAllGpuMotherboards();
  const { data: plans } = useGetPlansList();
  const { data: disks } = useGetDisksList();
  const { mutate, isPending } = useUpdateUserPackage();
  const { push } = useRouter();

  const title = 'تغییر بسته GPU کاربر';

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    mutate(
      {
        id: id as string,
        data: data as IUpdatePackageRequestPayload,
      },
      {
        onError: (e) => {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data.error);
          }
        },
        onSuccess: (s) => {
          toast.success(s.data.detail);
          push(GPU_ROUTES.LOGS);
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.error);
      setTimeout(() => {
        push(GPU_ROUTES.LOGS);
      }, 1000);
    }
  }, [error]);

  useEffect(() => {
    form.reset({
      status: data?.data.data.status === strings.active ? 'active' : 'canceled',
      gpu_motherboard_id: data?.data.data.gpu_motherboard_id,
      disk_id: data?.data.data.disk.id,
      plan_id: data?.data.data.plan.id,
    });
  }, [id, data]);

  return (
    <Form {...form}>
      <FormContainer title={title}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <FormWrapper>
            <RHFAutocomplete
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              control={form.control}
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              name="gpu_motherboard_id"
              options={
                gpuMotherboards?.map((gpuMotherboard: any) => ({
                  label: gpuMotherboard.name,
                  value: gpuMotherboard.id,
                })) || []
              }
              placeholder={strings.chooseConfigPlaceholder}
              label={`${strings.chooseConfig}*`}
            />
            <RHFAutocomplete
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              control={form.control}
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              name="disk_id"
              options={
                disks?.map((d) => ({
                  label: d.name,
                  value: d.id,
                })) || []
              }
              placeholder={strings.chooseDiskPlaceholder}
              label={`${strings.chooseDisk}*`}
            />
            <RHFAutocomplete
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              control={form.control}
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              name="plan_id"
              options={
                plans?.map((p) => ({
                  label: p.name,
                  value: p.id,
                })) || []
              }
              placeholder={strings.choosePlanPlaceholder}
              label={`${strings.choosePlan}*`}
            />
            <RHFToggle
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              control={form.control}
              onOff
              label={`${strings.status}*`}
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              name="status"
              items={[
                { label: strings.active, value: 'active' },
                { label: strings.deactive, value: 'canceled' },
              ]}
            />
          </FormWrapper>
          <div className="mt-10 flex w-full justify-center gap-5">
            <Button
              isFilled
              type="submit"
              loading={isPending}
              disabled={isPending}
            >
              {strings.submit}
            </Button>
            <Button type="button" onClick={() => push(GPU_ROUTES.LOGS)}>
              {strings.cancelAction}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Form>
  );
};

export default ChangePackageForm;
