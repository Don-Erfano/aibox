'use client';

import { strings } from '@/constant';
import { FormContainer, FormWrapper } from '@/components';
import {
  Button,
  Editor,
  Form,
  RHFAutocomplete,
  RHFImageUploader,
  RHFInput,
} from '@aibox/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, NewsSchemaType, newsSchema } from '../schema';
import { useGetNewsTags } from '@/services/news-tags';
import { useRouter } from 'next/navigation';
import { NEWS_ROUTES } from '@/routes';
import { UserFormProps } from './interface';
import { useUploadFile } from '@/services/upload';

const NewsForm = ({
  title,
  initialData,
  onSubmit,
  isLoading = false,
}: UserFormProps) => {
  const router = useRouter();
  const form = useForm<NewsSchemaType>({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData ?? defaultValues,
    mode: 'onChange',
  });

  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();

  const handleThumbnailUpload = async (input: File | File[] | null) => {
    if (!input) return;

    const file = Array.isArray(input) ? input[0] : input;

    const formData = new FormData();
    formData.append('type', 'news');
    formData.append('file', file);

    try {
      const result = await uploadFile(formData);
      form.setValue('thumbnail', result.id);
    } catch (err) {
      console.error('Image upload failed', err);
    }
  };

  const handleSubmit: SubmitHandler<NewsSchemaType> = (data) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    form.reset();
    router.push(NEWS_ROUTES.LIST);
  };

  const { newsTags } = useGetNewsTags();
  const newsOptions = newsTags.map((news) => ({
    value: news.id,
    label: news.name,
  }));

  return (
    <FormContainer title={title}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFInput
              name="title"
              control={form.control}
              label={strings.title}
              type="text"
            />

            <RHFAutocomplete
              name="tags"
              control={form.control}
              options={newsOptions}
              label={strings.tags}
              placeholder={strings.selectOption}
              variant="multiple"
              limited_tag={5}
            />

            <RHFImageUploader
              name="uploader"
              control={form.control}
              label={strings.thumbnail}
              onSubmitUpload={handleThumbnailUpload}
            />

            <RHFInput
              name="summary"
              control={form.control}
              label={strings.newsSummary}
              type="text"
            />

            <RHFInput
              name="slug"
              control={form.control}
              label={strings.addressSuffix}
              type="text"
            />
          </FormWrapper>

          <div className="flex flex-col w-full">
            <div className="max-w-[1376px] xl:gap-x-[140px] 2xl:gap-x-[400px] xl:self-center grid grid-cols-1 gap-10 lg:place-content-between lg:grid-cols-[minmax(0,_480px)_minmax(0,_480px)] px-4 sm:px-8 md:px-16 lg:px-6 xl:px-[60px]">
              <div className="lg:col-span-2 mt-4 mb-12">
                <Editor
                  control={form.control}
                  name="content"
                  height="180px"
                  label={strings.newsContent}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5 justify-center">
            <Button
              size="lg"
              isFilled
              type="submit"
              disabled={isLoading || isUploading}
            >
              {strings.submit}
            </Button>
            <Button size="lg" type="button" onClick={handleCancel}>
              {strings.cancel_operation}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default NewsForm;
