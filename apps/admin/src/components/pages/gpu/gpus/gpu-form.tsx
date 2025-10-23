'use client';

import axios from 'axios';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  useDeleteGpu,
  useGetGpuInfo,
  useGetGpusList,
  usePostGpu,
  usePutGpu,
} from '@/services/gpu';
import {
  Button,
  Form,
  FormContainer,
  FormWrapper,
  RHFAutocomplete,
  RHFInput,
  RHFToggle,
  toast,
} from '@aibox/ui';
import { strings } from '@/constant';

import { gpuFormType, gpuScheme } from './constants';
import { GPU_ROUTES } from '@/routes';

const GpuForm: FC = () => {
  const form = useForm<gpuFormType>({
    mode: 'onChange',
    defaultValues: {
      is_active: 'active',
    },
    resolver: zodResolver(gpuScheme),
  });
  const { id } = useParams();
  const pathname = usePathname();
  const { back, push } = useRouter();
  const { refetch } = useGetGpusList();

  const { data } = useGetGpuInfo(id as string);
  const { mutate } = useDeleteGpu();
  const { mutate: addGpu, isPending: addPending } = usePostGpu();
  const { mutate: editGpu, isPending: editPending } = usePutGpu();

  const title = pathname.includes('edit')
    ? `${strings.editGpu} - ${data?.data.data.name || ''}`
    : strings.newGpu;

  useEffect(() => {
    if (id) {
      form.reset({
        model: data?.data.data.model || '',
        brand: data?.data.data.brand || '',
        ram: Number(data?.data.data.ram),
        free_days: Number(data?.data.data.free_days) || 0,
        free_hour: Number(data?.data.data.free_hour) || 0,
        is_active: data?.data.data.is_active ? 'active' : 'deactive',
        cuda_cores: Number(data?.data.data.cuda_cores),
        reliability: Number(data?.data.data.reliability),
      });
    }
  }, [data, form, id]);

  const submitHandler = (data: gpuFormType) => {
    addGpu(
      {
        ...data,
        cuda_cores: Number(data.cuda_cores),
        ram: Number(data.ram),
        reliability: Number(data.reliability),
        is_active: data.is_active === 'active' ? true : false,
        free_days: Number(data.free_days || 0),
        free_hour: Number(data.free_hour || 0),
      },
      {
        onSuccess: (s) => {
          toast.success(s.data.detail);
          push(GPU_ROUTES.GPUS);
          refetch();
        },
        onError: (e) => {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data.error);
          }
        },
      }
    );
  };

  const editHandler = (data: gpuFormType) => {
    editGpu(
      {
        data: {
          ...data,
          cuda_cores: Number(data.cuda_cores),
          ram: Number(data.ram),
          reliability: Number(data.reliability),
          is_active: data.is_active === 'active' ? true : false,
          free_days: Number(data.free_days),
          free_hour: Number(data.free_hour),
        },
        id: id as string,
      },
      {
        onSuccess: (s) => {
          toast.success(s.data.detail);
          push(GPU_ROUTES.GPUS);
          refetch();
        },
        onError: (e) => {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data.error);
          }
        },
      }
    );
  };

  const handleDelete = () => {
    mutate(id as string, {
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data.error);
        }
      },
      onSuccess: (s) => toast.success(s.data.detail),
    });
  };

  return (
    <Form {...form}>
      <FormContainer
        title={title}
        onDelete={pathname.includes('edit') ? () => handleDelete() : undefined}
      >
        <form onSubmit={form.handleSubmit(id ? editHandler : submitHandler)}>
          <FormWrapper>
            <RHFInput control={form.control} name="model" label="مدل*" />
            <RHFAutocomplete
              control={form.control}
              name="brand"
              options={[
                {
                  label: 'GeForce RTX',
                  value: 'GeForce RTX',
                },
                {
                  label: 'GeForce',
                  value: 'GeForce',
                },
                {
                  label: 'Nvidia',

                  value: 'Nvidia',
                },
              ]}
              placeholder="برند را انتخاب کنید"
              label="برند"
            />
            <RHFInput
              control={form.control}
              name="reliability"
              label="Reliability*"
              type="number"
              endAdornment={'%'}
            />
            <RHFInput
              control={form.control}
              name="ram"
              type="number"
              label="رم*"
            />
            <RHFInput
              control={form.control}
              name="cuda_cores"
              type="number"
              label="تعداد هسته Cuda*"
            />
            <RHFInput
              control={form.control}
              name="free_hour"
              type="number"
              label="ساعت استفاده رایگان"
            />
            <RHFInput
              control={form.control}
              name="free_days"
              label="بازه استفاده رایگان"
              type="number"
              placeholder="محدودیت زمانی که کاربر‍‌ می‌تواند از قابلیت رایگان خود استفاده کند."
            />
            <RHFToggle
              control={form.control}
              name="is_active"
              onOff
              label={`${strings.status}*`}
              items={[
                { label: 'فعال', value: 'active' },
                { label: 'غیرفعال', value: 'deactive' },
              ]}
            />
          </FormWrapper>
          <div className="mt-10 flex w-full justify-center gap-5">
            <Button
              isFilled
              type="submit"
              loading={addPending || editPending}
              disabled={addPending || editPending}
            >
              {strings.submit}
            </Button>
            <Button onClick={() => back()} disabled={addPending || editPending}>
              {strings.cancelAction}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Form>
  );
};

export default GpuForm;
