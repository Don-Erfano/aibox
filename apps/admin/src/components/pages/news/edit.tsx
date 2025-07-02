'use client';

import NewsForm from './components/news-form';
import { useGetNews, usePutNewsById } from '@/services/news';
import { NewsSchemaType } from './schema';
import { strings } from '@/constant';
import { toast } from '@aibox/ui';
import { useRouter } from 'next/navigation';
import { NEWS_ROUTES } from '@/routes';

const EditNews = ({ id }: { id: string }) => {
  const { mutate: updateNews, isPending } = usePutNewsById(id);
  const router = useRouter();

  const { data: news, isLoading } = useGetNews(id);

  const handleSubmit = (data: NewsSchemaType) => {
    updateNews(data, {
      onSuccess: () => {
        toast.success('خبر مورد نظر با موفقیت ویرایش شد.');
        router.push(NEWS_ROUTES.LIST);
      },
    });
  };

  if (isLoading || !news) return <p>loading...</p>;

  return (
    <NewsForm
      title={strings.editNews}
      isLoading={isPending}
      onSubmit={handleSubmit}
      initialData={{
        content: news.content,
        summary: news.summary,
        slug: news.slug,
        title: news.title,
        tags: news.tags?.map((tags) => tags.id),
        uploader: news?.thumbnail,
      }}
    />
  );
};

export default EditNews;
