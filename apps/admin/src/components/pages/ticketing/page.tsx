'use client';
import { FC } from 'react';
import {
  CategoryQuestion,
  TicketingPage,
} from '@/components/pages/ticketing/index';
import { Tab } from '@aibox/ui';

const TicketingTab: FC = () => {
  const tabs = [
    {
      id: 'ticket-list',
      name: 'تیکت‌ها',
      content: <TicketingPage />,
      isDisabled: false,
    },
    {
      id: 'category-questions',
      name: 'دسته‌بندی سوالات',
      content: <CategoryQuestion />,
      isDisabled: false,
    },
  ];

  return (
    <div className="w-full">
      <Tab tabs={tabs} />
    </div>
  );
};

export default TicketingTab;
