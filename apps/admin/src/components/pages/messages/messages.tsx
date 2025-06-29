'use client';
import { FC } from 'react';
import { Tab } from '@aibox/ui';
import { PublicMessagePage } from '@/components/pages/messages/index';
import { strings } from '@/constant';

const MessagesPage: FC = () => {
  const tabs = [
    {
      id: 'emails',
      name: strings.emails,
      content: (
        <div className="p-4 text-gray-700">این قسمت مربوط به پیامک‌هاست.</div>
      ),
    },
    {
      id: 'sms',
      name: strings.sms,
      content: (
        <div className="p-4 text-gray-700">این قسمت مربوط به پیامک‌هاست.</div>
      ),
    },
    {
      id: 'notifications',
      name: strings.notifications,
      content: (
        <div className="p-4 text-gray-700">این قسمت مربوط به اعلان‌هاست.</div>
      ),
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
