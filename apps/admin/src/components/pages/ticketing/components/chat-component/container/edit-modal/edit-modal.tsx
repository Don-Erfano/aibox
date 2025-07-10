'use client';

import { FC, useState, useMemo } from 'react';
import { AibAutocomplete, Button, toast } from '@aibox/ui';
import { CategoryOption, EditTicketFormProps } from './interface';
import { useGetTicketingCategory } from '@/services/ticketing/ticketing-category/ticketing-category.hook';
import { strings } from '@/constant';
import { useUpdateTicketCategory } from '@/services/ticketing/ticketing-list';

const EditTicketForm: FC<EditTicketFormProps> = ({ ticketId, onSuccess }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState<
    string | undefined
  >(undefined);

  const { categories, isLoading: isCategoriesLoading } =
    useGetTicketingCategory();
  const updateCategoryMutation = useUpdateTicketCategory();

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      id: category.id,
      label: category.name,
    }));
  }, [categories]);

  const handleCategorySelect = (selectedOptions: CategoryOption[]) => {
    if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      setSelectedCategoryId(String(selectedOptions[0].id));
      setSelectedCategoryLabel(selectedOptions[0].label);
    } else {
      setSelectedCategoryId(undefined);
      setSelectedCategoryLabel(undefined);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCategoryId) return;

    try {
      const response = await updateCategoryMutation.mutateAsync({
        path: { id: ticketId },
        payload: {
          data: {
            category: selectedCategoryId,
            answers: null,
          },
        },
      });
      toast.success(response.detail);
      onSuccess();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error;
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    onSuccess();
  };

  const isLoading = updateCategoryMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="h-full space-y-2">
        <label className="block text-sm font-medium text-gray-700 text-right">
          {strings.category}
        </label>
        <AibAutocomplete
          options={categoryOptions}
          onSelect={handleCategorySelect}
          value={selectedCategoryLabel}
          placeholder={strings.choose_category}
          variant="single"
          mode="light"
          h_size="sm"
          disabled={isCategoriesLoading}
        />
      </div>

      <div className="flex justify-center items-center gap-x-5 ">
        <Button variant="default" size="lg" isFilled onClick={handleSubmit}>
          {strings.submit}
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {strings.cancel}
        </Button>
      </div>
    </div>
  );
};
export default EditTicketForm;
