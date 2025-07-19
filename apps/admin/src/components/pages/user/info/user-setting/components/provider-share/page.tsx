'use client';

import { FC, useEffect, useState } from 'react';
import { Button, Form, Modal, RHFInput, toast } from '@aibox/ui';
import { FormValues, ProviderShareProps } from './types';
import { useForm } from 'react-hook-form';
import { useUpdateProviderShare } from '@/services/user/info/user-setting/provider-share';
import { convertPersianNumberToEnglish } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { providerShareSchema } from './schema';
import { strings } from '@/constant';

const ProviderShareField: FC<ProviderShareProps> = ({ data, userId }) => {
  const [providerShare, setProviderShare] = useState(
    data?.owner_earning_coefficient
  );
  const [platformShare, setPlatformShare] = useState(
    data?.withdraw_coefficient
  );
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(providerShareSchema),
    defaultValues: { providerShare: providerShare },
  });
  const { control, reset, handleSubmit } = form;

  const { mutateAsync, isPending } = useUpdateProviderShare();

  useEffect(() => {
    setProviderShare(data?.owner_earning_coefficient);
    setPlatformShare(data?.withdraw_coefficient);
  }, [data]);

  useEffect(() => {
    if (open) {
      reset({ providerShare: data?.owner_earning_coefficient });
    }
  }, [open, data, reset]);

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const rawValue = data.providerShare?.toString();
      const fixedValue = convertPersianNumberToEnglish(rawValue);
      const response = await mutateAsync({
        id: userId,
        earnings_coefficient_api: Number(fixedValue),
      });
      if (response.data.code === 'SUCCESS') {
        toast['success'](response.data.detail);
        setOpen(false);
      }
    } catch (error: any) {
      toast['error'](error.data.detail);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-800 cursor-default">
        {strings.providerProfit}
      </p>

      <p className="font-normal text-sm text-zinc-600">
        {strings.providerProfit}: {providerShare}٪ - {strings.platformProfit}{' '}
        {platformShare}٪
      </p>
      <Modal
        trigger={
          <Button variant="outline" isFilled className="self-start w-auto">
            {strings.changeProviderProfit}
          </Button>
        }
        title={strings.changeProviderProfit}
        open={open}
        onOpenChange={setOpen}
      >
        <div className=" flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-8 items-center justify-center w-72"
            >
              <div className="w-full">
                <RHFInput
                  control={control}
                  label={strings.providerProfit}
                  name="providerShare"
                  endAdornment="%"
                  defaultValue={providerShare}
                  type="number"
                />
              </div>

              <div className="flex items-center w-full  gap-5 ">
                <Button
                  className="flex-1"
                  variant="default"
                  isFilled
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? 'در حال ثبت...' : strings.submit}
                </Button>
                <Button
                  className="flex-1"
                  variant="default"
                  onClick={handleCancel}
                  type="button"
                >
                  {strings.ignore}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ProviderShareField;
