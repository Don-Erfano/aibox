'use client';
import { FC } from 'react';
import { CategoryCardProps } from './interface';
import { Button } from '@aibox/ui';

const CategoryQuestionCard: FC<CategoryCardProps> = ({
  category_title,
  category_id,
  category_num,
  onClick,
}) => {
  return (
    <div className="max-w-106 h-43 p-6 flex flex-col bg-white shadow-[0px_4px_12px_0px_rgba(0_,0_,0_,0.20)] rounded-xl  transition-shadow duration-300">
      <div className="w-full flex items-center justify-between mb-10">
        <div className="flex items-center space-x-2">
          <h4 className="font-medium text-zinc-700 line-clamp-2">
            {category_title}
          </h4>
        </div>
        <span className="text-4xl text-zinc-700">{category_num}</span>
      </div>

      <Button
        size="full"
        variant="outline"
        onClick={onClick}
        className="mt-auto"
      >
        مشاهده
      </Button>
    </div>
  );
};

export default CategoryQuestionCard;
