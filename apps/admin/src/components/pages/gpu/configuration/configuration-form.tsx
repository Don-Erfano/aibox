'use client';

import axios from 'axios';
import { Resolver, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Button,
  Form,
  FormContainer,
  FormWrapper,
  Loading,
  RHFAutocomplete,
  RHFInput,
  RHFToggle,
  toast,
} from '@aibox/ui';

import { GPU_ROUTES } from '@/routes';

import DeleteModal from './delete-modal';
import SubmitWarningModal from './submit-warning-modal';
import {
  activeStatusOptions,
  basePackageOptions,
  configurationSchema,
  TRequestData,
} from './constants';
import { strings } from '@/constant';
import {
  useGetConfigurationById,
  useGetConfigurationData,
  useGetGpusList,
  useGetMotherboardsList,
  usePostConfiguration,
  usePutConfiguration,
} from '@/services/gpu';

const ConfigurationForm: FC<{ id?: string }> = ({ id }) => {
  const { push } = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState<string | undefined>(
    undefined
  );
  const [openSubmitModal, setOpenSubmitModal] = useState<boolean>(false);

  const { refetch } = useGetConfigurationData();
  const { mutateAsync: addMutation, isPending: addPending } =
    usePostConfiguration();
  const { mutateAsync: editMutation, isPending: editPending } =
    usePutConfiguration();
  const { data, isLoading } = useGetConfigurationById(id);
  const { gpus } = useGetGpusList();
  const { motherboards } = useGetMotherboardsList();

  const initialValuesRef = useRef<TRequestData | null>(null);

  const form = useForm<TRequestData>({
    mode: 'onChange',
    resolver: zodResolver(configurationSchema) as Resolver<TRequestData>,
  });

  const { control, watch, reset, setValue, handleSubmit, getValues } = form;
  const basePackageValue = watch('base_package_status');

  const submitHandler = async (data: TRequestData) => {
    try {
      const resp = await addMutation({
        ...data,
        is_active: data.is_active === 'active' ? true : false,
      });
      if (resp.data.code === 'SUCCESS') {
        toast.success(resp.data.detail);
        push(GPU_ROUTES.CONFIGURATION);
        refetch();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.error);
      }
    }
  };

  const editHandler = async (data: TRequestData) => {
    try {
      const resp = await editMutation({
        data: {
          ...data,
          is_active: data.is_active === 'active' ? true : false,
        },
        id,
      });
      if (resp.data.code === 'SUCCESS') {
        toast.success(strings.editSuccessMessage);
        push(GPU_ROUTES.CONFIGURATION);
        refetch();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.error);
      }
    }
  };

  useEffect(() => {
    if (id && data?.data?.data) {
      const initVals: TRequestData = {
        discount: data.data.data.discount,
        gpu_id: data.data.data.gpu.id,
        motherboard_id: data.data.data.motherboard.id,
        hourly_price: data.data.data.hourly_price,
        is_active: data.data.data.is_active ? 'active' : 'deactive',
        base_package_status: data.data.data.base_package_status,
        discount_monthly: data.data.data.discount_monthly,
        price_monthly: data.data.data.price_monthly,
      };
      reset(initVals);
      initialValuesRef.current = initVals;
    }
  }, [id, data, reset]);

  useEffect(() => {
    if (basePackageValue === 'MONTHLY') {
      setValue('hourly_price', 0);
      setValue('discount', 0);
    }
    if (basePackageValue === 'HOURLY') {
      setValue('price_monthly', 0);
      setValue('discount_monthly', 0);
    }
  }, [basePackageValue, setValue]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const currentVals = getValues();

    if (id && initialValuesRef.current) {
      const hasChanges =
        JSON.stringify(initialValuesRef.current) !==
        JSON.stringify(currentVals);

      if (hasChanges) {
        setOpenSubmitModal(true);
        return;
      } else {
        editHandler(currentVals);
        return;
      }
    }

    submitHandler(currentVals);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );

  return (
    <Form {...form}>
      <DeleteModal
        handleClose={(s) => {
          setOpenDeleteModal(s);
        }}
        openModal={openDeleteModal}
      />

      <SubmitWarningModal
        openModal={openSubmitModal}
        handleClose={() => setOpenSubmitModal(false)}
        onConfirm={handleSubmit(id ? editHandler : submitHandler)}
        loading={addPending || editPending}
      />

      <FormContainer
        title={id ? strings.editConfiguration : strings.addConfiguration}
        onDelete={() => setOpenDeleteModal(id)}
      >
        <form onSubmit={handleFormSubmit}>
          <FormWrapper>
            <RHFAutocomplete
              control={control}
              name="gpu_id"
              options={
                gpus.map((g) => ({
                  label: g.name,
                  value: g.id,
                })) || []
              }
              placeholder={strings.chooseBrand}
              label="GPU*"
              readOnly={!!id}
            />
            <RHFAutocomplete
              control={control}
              name="motherboard_id"
              options={
                motherboards.map((m) => ({
                  label: m.name,
                  value: m.id,
                })) || []
              }
              placeholder={strings.chooseBrand}
              label="Motherboard*"
              readOnly={!!id}
            />

            <RHFToggle
              control={control}
              name="base_package_status"
              items={basePackageOptions}
              label={`${strings.packageType}*`}
            />

            <RHFToggle
              control={control}
              name="is_active"
              label={`${strings.status}*`}
              onOff
              items={activeStatusOptions}
            />

            {basePackageValue && basePackageValue !== 'MONTHLY' && (
              <>
                <RHFInput
                  control={control}
                  name="hourly_price"
                  type="number"
                  label={strings.hourlyPrice}
                  placeholder={strings.hourlyUsagePrice}
                  endAdornment={strings.toman}
                />
                <RHFInput
                  control={control}
                  name="discount"
                  type="number"
                  label={strings.hourlyDiscount}
                  endAdornment="%"
                />
              </>
            )}

            {basePackageValue && basePackageValue !== 'HOURLY' && (
              <>
                <RHFInput
                  control={control}
                  name="price_monthly"
                  type="number"
                  label={strings.monthlyPrice}
                  placeholder={strings.monthlyUsagePrice}
                  endAdornment={strings.toman}
                />
                <RHFInput
                  control={control}
                  name="discount_monthly"
                  type="number"
                  label={strings.monthlyDiscount}
                  endAdornment="%"
                />
              </>
            )}
          </FormWrapper>
          <div className="mt-12 flex w-full justify-center gap-5">
            <Button
              isFilled
              type="submit"
              loading={addPending || editPending}
              disabled={addPending || editPending}
            >
              {strings.submit}
            </Button>
            <Button
              onClick={() => push(GPU_ROUTES.CONFIGURATION)}
              disabled={addPending || editPending}
            >
              {strings.cancelAction}
            </Button>
          </div>
        </form>
      </FormContainer>
    </Form>
  );
};

export default ConfigurationForm;
