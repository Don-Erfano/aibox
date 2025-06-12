'use client';
import { FC } from 'react';
import { Tab } from '@aibox/ui';
import { MessagesString } from '@/components/pages/messages/string';
import { PublicMessagePage } from '@/components/pages/messages/index';

const MessagesPage: FC = () => {
  const tabs = [
    {
      id: 'emails',
      name: MessagesString.email,
      content: (
        <div className="p-4 text-gray-700">این قسمت مربوط به پیامک‌هاست.</div>
      ),
    },
    {
      id: 'sms',
      name: MessagesString.sms,
      content: (
        <div className="p-4 text-gray-700">این قسمت مربوط به پیامک‌هاست.</div>
      ),
    },
    {
      id: 'notifications',
      name: MessagesString.notifications,
      content: (
        <div className="p-4 text-gray-700">این قسمت مربوط به اعلان‌هاست.</div>
      ),
    },
    {
      id: 'public-message',
      name: MessagesString.public_messages,
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
