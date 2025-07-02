'use client';

import { FC } from 'react';
import NewsForm from './components/news-form';
import { strings } from '@/constant';
import { NewsSchemaType } from './schema';
import { useCreateNews } from '@/services/news';

const AddNews: FC = () => {
  const { mutate: createNews, isPending } = useCreateNews();

  const handleSubmit = (data: NewsSchemaType) => {
    console.log(data);
    createNews({
      ...data,
      tags: data.tags?.map((tags) => tags),
    });
  };

  return (
    <NewsForm
      title={strings.addNewsTitle}
      isLoading={isPending}
      onSubmit={handleSubmit}
    />
  );
};

export default AddNews;
