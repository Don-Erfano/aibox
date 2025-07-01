import { strings } from '@/constant';
import { FormContainer, FormWrapper } from '@/components';
import { Button, Form, RHFAutocomplete, RHFInput } from '@aibox/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues, NewsSchemaType, newsSchema } from '../schema';
import { useGetNewsTags } from '@/services/news-tags';
import { useRouter } from 'next/navigation';
import { NEWS_ROUTES } from '@/routes';

interface UserFormProps {
  title: string;
  initialData?: Partial<NewsSchemaType>;
  onSubmit: (data: NewsSchemaType) => void;
  isLoading?: boolean;
}

const NewsForm = ({
  title,
  initialData,
  onSubmit,
  isLoading = false,
}: UserFormProps) => {
  const router = useRouter();
  const form = useForm<NewsSchemaType>({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData ? initialData : defaultValues,
  });

  const handleSubmit: SubmitHandler<NewsSchemaType> = (data) => {
    onSubmit(data);
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
              placeholder={strings.password}
            />

            <RHFInput
              name="thumbnail"
              control={form.control}
              label={strings.thumbnail}
              type="file"
            />

            <RHFInput
              name="summary"
              control={form.control}
              label={strings.newsSummary}
              type="text"
            />

            <RHFInput
              name="content"
              control={form.control}
              label={strings.addressSuffix}
              type="text"
            />
          </FormWrapper>

          <div className="max-w-[1376px] mx-4 sm:px-8 md:px-16 lg:px-6 xl:px-[60px]">
            <RHFInput
              name="content"
              control={form.control}
              label={strings.newsContent}
              type="text"
            />
          </div>

          <div className="flex gap-5 justify-center mt-12">
            <Button size="lg" isFilled type="submit" disabled={isLoading}>
              {strings.submit}
            </Button>
            <Button
              size="lg"
              type="button"
              onClick={() => router.push(NEWS_ROUTES.LIST)}
            >
              {strings.cancel_operation}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default NewsForm;
