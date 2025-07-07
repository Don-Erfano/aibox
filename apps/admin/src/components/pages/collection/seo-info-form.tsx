'use client';

import { Button, Form, RHFAutocomplete, RHFInput } from '@aibox/ui';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { FormWrapper } from '@/components/templates';
import { strings } from '@/constant';

import { CollectionSeo } from './interface';

export const SeoInfoForm = ({ collectionId }: { collectionId?: string }) => {
  const isEdit = !!collectionId;

  const form = useForm<CollectionSeo>();
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
            name="title"
            label={`${strings.title}*`}
            variant="sm"
          />
          <RHFInput
            control={control}
            name="meta_description"
            label={`${strings.metaDescription}*`}
            variant="sm"
          />
          <RHFInput
            control={control}
            name="meta_keywords"
            label={`${strings.metaKeywords}*`}
            variant="sm"
          />
          <RHFInput
            control={control}
            name="canoncial"
            label={`${strings.canonical}*`}
            variant="sm"
          />
          <RHFAutocomplete
            control={control}
            name="robots"
            label={`${strings.robots}*`}
            placeholder={strings.select}
            h_size="sm"
            options={[
              { label: 'No Index', value: 'noindex' },
              { label: 'No Follow', value: 'nofollow' },
            ]}
          />
          <RHFInput
            control={control}
            name="image"
            label={`${strings.imageLink}*`}
            variant="sm"
          />
        </FormWrapper>

        <div className="flex gap-5 justify-center mt-12">
          <Button isFilled type="submit" disabled={isPending}>
            {isEdit ? strings.submitSeoInfoChanges : strings.submitSeoInfo}
          </Button>
          <Button type="button" onClick={() => router.back()}>
            {isEdit ? strings.ignore : strings.cancelAction}
          </Button>
        </div>
      </form>
    </Form>
  );
};
