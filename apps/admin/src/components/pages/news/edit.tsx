'use client';

import NewsForm from './components/news-form';
import { useGetNews, usePutNewsById } from '@/services/news';
import { NewsSchemaType } from './schema';
import { strings } from '@/constant';

const EditNews = ({ id }: { id: string }) => {
  const { mutate: createNews, isPending } = usePutNewsById();

  const { data: news, isPending: isLoading } = useGetNews(id);

  const handleSubmit = (data: NewsSchemaType) => {
    createNews(data);
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
        tags: news.tags.map(),
      }}
    />
  );
};

export default EditNews;
