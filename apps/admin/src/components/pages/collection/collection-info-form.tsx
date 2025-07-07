'use client';

import {
  Button,
  Form,
  RHFAutocomplete,
  RHFImageUploader,
  RHFInput,
  RHFToggleSwitch,
} from '@aibox/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { FormWrapper } from '@/components/templates';
import { strings } from '@/constant';

import { apiOrderOptions } from './constants';
import { CollectionInfo } from './interface';

export const CollectionInfoForm = ({
  collectionId,
}: {
  collectionId?: string;
}) => {
  const isEdit = !!collectionId;

  const form = useForm<CollectionInfo>({
    defaultValues: {
      is_active: 'true',
    },
  });
  const { control, handleSubmit } = form;
  const isPending = false;
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        className="mt-12"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <FormWrapper>
          <RHFInput
            control={control}
            name="name"
            label={`${strings.collectionName}*`}
            variant="sm"
          />
          <RHFInput
            control={control}
            name="english_name"
            label={`${strings.collectionLatinName}*`}
            variant="sm"
          />
          <RHFAutocomplete
            control={control}
            name="api_order_by"
            label={`${strings.sortBasedOn}*`}
            placeholder={strings.select}
            h_size="sm"
            options={apiOrderOptions}
          />
          <RHFInput
            control={control}
            name="rank"
            label={strings.rankForShow}
            placeholder={strings.rankForShowInMarket}
            variant="sm"
          />

          <RHFInput
            control={control}
            name="api_query"
            label={strings.query}
            placeholder={strings.placeholderText}
            variant="sm"
          />

          <RHFImageUploader control={control} name="picture" />

          <RHFToggleSwitch
            control={control}
            label={strings.statusForShowInMarket}
            name="is_active"
            items={[
              { label: strings.successful, value: 'true' },
              { label: strings.unsuccessful, value: 'false' },
            ]}
            variant="onOff"
          />
        </FormWrapper>

        <div className="px-4 sm:px-8 md:px-16 lg:px-6 xl:px-[60px] mt-10">
          <RHFInput
            control={control}
            name="description"
            label={strings.description}
            variant="sm"
          />
        </div>
        <div className="flex gap-5 justify-center mt-12">
          <Button isFilled type="submit" disabled={isPending}>
            {isEdit
              ? strings.submitCollectionInfoChanges
              : strings.submitCollectionInfo}
          </Button>
          <Button size="lg" type="button" onClick={() => router.back()}>
            {isEdit ? strings.ignore : strings.cancelAction}
          </Button>
        </div>
      </form>
    </Form>
  );
};
