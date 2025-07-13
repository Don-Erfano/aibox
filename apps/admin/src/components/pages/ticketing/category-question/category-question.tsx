'use client';
import { FC } from 'react';
import CategoryQuestionCard from '../components/category-question-card/category-question-card';
import { useRouter } from 'next/navigation';
import { useGetTicketingCategory } from '@/services/ticketing/ticketing-category/ticketing-category.hook';
import { FabButton } from '@/components/fab-button';
import { SUPPORT_ROUTES } from '@/routes';

const CategoryQuestion: FC = () => {
  const router = useRouter();

  const { categories, isLoading } = useGetTicketingCategory();

  const handleEditCategory = (categoryId: string) => {
    router.push(`${SUPPORT_ROUTES.ADD_CATEGORY}/${categoryId}`);
  };

  const handleAddCategory = () => {
    router.push(SUPPORT_ROUTES.ADD_CATEGORY);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">هیچ دسته‌بندی یافت نشد</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 p-4 mt-6">
      {categories.map((category) => (
        <CategoryQuestionCard
          key={category.id}
          category_title={category.name}
          category_id={category.id}
          category_num={category.ticket_count}
          onClick={() => handleEditCategory(category.id)}
        />
      ))}
      <FabButton onClick={handleAddCategory} />
    </div>
  );
};

export default CategoryQuestion;
