'use client';

import { FC } from 'react';
import { useGetFaqCategoryList } from '@/services/support/faq';
import { Tab, TabProps } from '@aibox/ui';
import { SupportAccordion } from '@/components/pages/support/component/support-accordion';
import { strings } from '@/constant';

const FaqPage: FC = () => {
  const { categories, isLoading, isFetching } = useGetFaqCategoryList({
    page: 1,
    page_size: 50,
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">{strings.loadingFaq}</div>
    );
  }

  const tabs: TabProps['tabs'] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    isDisabled: category.faqs.length === 0,
    content: (
      <div className="space-y-4 pt-4">
        {category.faqs.map((faq) => (
          <SupportAccordion
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    ),
  }));

  return (
    <div className="w-full px-6 py-8">
      <Tab tabs={tabs} />
      {isFetching && (
        <div className="mt-4 text-sm text-gray-400 text-center">
          {strings.updating}
        </div>
      )}
    </div>
  );
};

export default FaqPage;
