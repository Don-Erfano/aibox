'use client';
import { FC, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomMessage } from '@/components/pages/messages/components/custom-message';
import { strings } from '@/constant';
import { FormContainer, FormWrapper } from '@/components';
import { Form, RHFInput, Button, toast } from '@aibox/ui';
import {
  useCreateTicketingCategory,
  useGetSingleTicketingCategory,
  useUpdateTicketingCategory,
  useDeleteTicketingCategory,
} from '@/services/ticketing/ticketing-category/ticketing-category.hook';
import { CreateCategoryFormData, createCategorySchema } from './schema';
import { SUPPORT_ROUTES } from '@/routes';
import { DeleteMessageModal } from '@/components/pages/messages/components/delete-message-modal';

const CategoryPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.id as string | undefined;
  const isEditMode = Boolean(categoryId);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: categoryDate } = useGetSingleTicketingCategory(
    isEditMode ? categoryId! : ''
  );

  const createCategoryMutation = useCreateTicketingCategory();
  const updateCategoryMutation = useUpdateTicketingCategory();
  const deleteCategoryMutation = useDeleteTicketingCategory();

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      categoryName: '',
      questions: [],
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (isEditMode && categoryDate) {
      reset({
        categoryName: categoryDate.name ?? '',
        questions: categoryDate.questions ?? [],
      });
    }
  }, [isEditMode, categoryDate, reset]);

  const onSubmit = async (data: CreateCategoryFormData) => {
    try {
      if (isEditMode && categoryId) {
        const result = await updateCategoryMutation.mutateAsync({
          id: categoryId,
          data: {
            name: data.categoryName,
            questions: data.questions,
          },
        });
        toast.success(result.data.detail);
        router.push(`${SUPPORT_ROUTES.CATEGORY}`);
      } else {
        const result = await createCategoryMutation.mutateAsync({
          name: data.categoryName,
          questions: data.questions,
        });
        toast.success(result.data.detail);
        router.push(SUPPORT_ROUTES.CATEGORY);
        reset();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  const onCancel = () => {
    router.push(SUPPORT_ROUTES.CATEGORY);
  };

  const deleteHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = (open: boolean) => {
    setIsDeleteModalOpen(open);
  };

  const handleConfirmDelete = async () => {
    if (!categoryId) return;

    try {
      const result = await deleteCategoryMutation.mutateAsync(categoryId);
      toast.success(result.data.detail);
      setIsDeleteModalOpen(false);
      router.push(SUPPORT_ROUTES.CATEGORY);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <>
      <FormContainer
        title={isEditMode ? strings.editCategory : strings.addCategory}
        onDelete={isEditMode ? deleteHandler : undefined}
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormWrapper>
              <RHFInput
                name="categoryName"
                label={strings.categoryName}
                control={control}
                placeholder={strings.categoryName}
              />
            </FormWrapper>
            <div className="max-w-[1376px] sm:!mx-8 sm:px-8 md:px-16 lg:px-6 md:!mx-16 lg:!mx-6 flex justify-between !mx-auto flex-col mt-12">
              <p className="max-w-[1376px] sm:!mx-8  md:!mx-16 lg:!mx-6  flex flex-col  mt-12 pb-2 text-sm text-start border-b-1 border-b-gray-400 text-slate-950 font-medium">
                {strings.questions}
              </p>
            </div>

            <div className="max-w-[1376px] sm:!mx-8 md:!mx-16 lg:!mx-6 xl:!mx-[60px] flex justify-between items-center mt-10">
              <CustomMessage />
            </div>
            <div className="max-w-[1376px] sm:mx-8 md:mx-16 lg:mx-6 xl:mx-[60px] flex gap-5 justify-center !mx-auto items-center mt-12">
              <Button
                size="sm"
                isFilled
                type="submit"
                variant="outline"
                loading={
                  createCategoryMutation.isPending ||
                  updateCategoryMutation.isPending
                }
                disabled={
                  createCategoryMutation.isPending ||
                  updateCategoryMutation.isPending ||
                  deleteCategoryMutation.isPending
                }
              >
                {isEditMode ? strings.edit : strings.submit}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={
                  createCategoryMutation.isPending ||
                  updateCategoryMutation.isPending ||
                  deleteCategoryMutation.isPending
                }
              >
                {strings.cancel_operation}
              </Button>
            </div>
          </form>
        </Form>
      </FormContainer>

      <DeleteMessageModal
        isOpen={isDeleteModalOpen}
        messageId={categoryId || ''}
        onOpenChange={handleDeleteModalClose}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={deleteCategoryMutation.isPending}
      />
    </>
  );
};

export default CategoryPage;
