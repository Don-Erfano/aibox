'use client';
import { FC } from 'react';
import { Tab } from '@aibox/ui';
import {
  EmailListPage,
  NotificationListPage,
  PublicMessagePage,
  SmsListPage,
} from '@/components/pages/messages/index';
import { strings } from '@/constant';

const MessagesPage: FC = () => {
  const tabs = [
    {
      id: 'emails',
      name: strings.emails,
      content: <EmailListPage />,
    },
    {
      id: 'sms',
      name: strings.sms,
      content: <SmsListPage />,
    },
    {
      id: 'notifications',
      name: strings.notifications,
      content: <NotificationListPage />,
    },
    {
      id: 'public-message',
      name: strings.public_messages,
      content: <PublicMessagePage />,
    },
  ];

  return (
    <div dir="rtl" className="p-6 space-y-4">
      <Tab tabs={tabs} />
    </div>
  );
};

export default MessagesPage;
