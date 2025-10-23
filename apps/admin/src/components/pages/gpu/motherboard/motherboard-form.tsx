'use client';

import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import {
  Button,
  Form,
  FormContainer,
  FormWrapper,
  RHFInput,
  toast,
} from '@aibox/ui';

import {
  useGetMotherboardInfo,
  useGetMotherboardsList,
  usePostMotherboard,
  usePutMotherboard,
} from '@/services/gpu';
import { strings } from '@/constant';

import DeleteModal from './delete-modal';
import { GPU_ROUTES } from '@/routes';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './constants';

const MotherboardForm: FC = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const { id } = useParams();
  const { push } = useRouter();
  const { refetch } = useGetMotherboardsList();
  const [openModal, setOpenModal] = useState<string>();
  const { mutateAsync: addMutation, isPending: addPending } =
    usePostMotherboard();
  const { mutateAsync: editMutation, isPending: editPending } =
    usePutMotherboard();
  const { data } = useGetMotherboardInfo(id as string);
  const title = id
    ? `${strings.editMotherboard} - ${data?.data.data.cpu_model}`
    : strings.newMotherboard;

  useEffect(() => {
    form.reset(data?.data.data);
  }, [data, id]);

  const submitHandler = async (data: any) => {
    try {
      const resp = await addMutation({
        ...data,
      });
      if (resp.data.code === 'SUCCESS') {
        toast.success(resp.data.detail);
        push(GPU_ROUTES.MOTHERBOARDS);
        refetch();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.error);
      }
    }
  };

  const editHandler = async (data: any) => {
    try {
      const resp = await editMutation({
        data,
        id,
      });
      if (resp.data.code === 'SUCCESS') {
        toast.success(resp.data.detail);
        push(GPU_ROUTES.MOTHERBOARDS);
        refetch();
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.error);
      }
    }
  };

  return (
    <FormContainer
      title={title}
      onDelete={id ? () => setOpenModal(id as string) : undefined}
    >
      <Form {...form}>
        <DeleteModal
          handleClose={(s) => setOpenModal(s)}
          openModal={openModal}
        />
        <form
          onSubmit={
            id
              ? form.handleSubmit(editHandler)
              : form.handleSubmit(submitHandler)
          }
        >
          <FormWrapper>
            <RHFInput name="cpu_model" label={`${strings.model}*`} />

            <RHFInput name="ram" label={`${strings.ram}*`} type="number" />
            <RHFInput
              name="cpu_cores"
              label={`${strings.cores}*`}
              type="number"
            />
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
              onClick={() => push(GPU_ROUTES.MOTHERBOARDS)}
              disabled={addPending || editPending}
            >
              {strings.cancelAction}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default MotherboardForm;
