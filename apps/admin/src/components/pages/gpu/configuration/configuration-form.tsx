'use client';

import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Form,
  RHFAutocomplete,
  RHFInput,
  toast,
  ToggleSwitch,
} from '@aibox/ui';

import {
  useGetConfigurationById,
  useGetgpuList,
  useGetMotherboardList,
  usePostConfiguration,
  usePutConfiguration,
} from '@/services';
import { strings } from '@/constant';
import { FormContainer, FormWrapper } from '@/components/templates';

import { IConfigurationForm, TRequestData } from './interface';
import { configurationSchema, defaultValues } from './constants';
import { GPU_ROUTES } from '@/routes';

const ConfigurationForm: FC<{ id?: string }> = ({ id }) => {
  const { push } = useRouter();
  const { data: gpus } = useGetgpuList();
  const { mutateAsync: addMutation } = usePostConfiguration();
  const { mutateAsync: editMutation } = usePutConfiguration();
  const { data } = useGetConfigurationById(id);
  const { data: motherboards } = useGetMotherboardList();
  const form = useForm<IConfigurationForm>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(configurationSchema),
  });

  const submitHandler = async (data: TRequestData) => {
    try {
      const resp = await addMutation({
        ...data,
        is_active: true,
        discount: Number(data.discount),
        hourly_price: Number(data.hourly_price),
      });
      if (resp.data.code === 'SUCCESS') {
        toast.success(resp.data.detail);
        push(GPU_ROUTES.CONFIGURATION);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editHandler = async (data: TRequestData) => {
    try {
      const resp = await editMutation({
        data: {
          ...data,
          is_active: true,
          discount: Number(data.discount),
          hourly_price: Number(data.hourly_price),
        },
        id,
      });
      if (resp.data.code === 'SUCCESS') {
        toast.success(resp.data.detail);
        push(GPU_ROUTES.CONFIGURATION);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    form.reset({
      discount: data?.data.data.discount,
      gpu_id: data?.data.data.gpu.id,
      motherboard_id: data?.data.data.motherboard.id,
      hourly_price: Number(data?.data.data.hourly_price || '').toLocaleString(),
    });
  }, [id, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(id ? submitHandler : editHandler)}>
        <FormContainer title={strings.configuration}>
          <FormWrapper>
            <RHFAutocomplete
              control={form.control}
              name="gpu_id"
              options={
                gpus?.data.data.list_detail.map((g) => ({
                  label: g.dsc,
                  value: g.id,
                })) || []
              }
              placeholder={strings.chooseBrand}
              label="GPU*"
            />
            <RHFAutocomplete
              control={form.control}
              name="motherboard_id"
              options={
                motherboards?.data.data.list_detail.map((m) => ({
                  label: m.dsc,
                  value: m.id,
                })) || []
              }
              placeholder={strings.chooseBrand}
              label="Motherboard*"
            />
            <RHFInput
              control={form.control}
              name="hourly_price"
              label={`${strings.price}*`}
            />
            <RHFInput
              control={form.control}
              name="discount"
              label={strings.discountPercent}
            />
            <div className="flex flex-col gap-4">
              <span className="text-sm text-zinc-600">{strings.status}*</span>
              <ToggleSwitch
                size="fixed"
                items={[
                  { label: 'فعال', value: 'active' },
                  { label: 'غیرفعال', value: 'deactive' },
                ]}
                value={form.getValues('is_active')}
                onValueChange={(e) => form.setValue('is_active', e)}
              />
            </div>
          </FormWrapper>
          <div className="flex justify-center w-full gap-5">
            <Button isFilled type="submit">
              {strings.submit}
            </Button>
            <Button onClick={() => push(GPU_ROUTES.CONFIGURATION)}>
              {strings.cancelAction}
            </Button>
          </div>
        </FormContainer>
      </form>
    </Form>
  );
};

export default ConfigurationForm;
