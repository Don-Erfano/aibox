'use client';
import { FC } from 'react';
import { ChatMessage } from '@/components/pages/ticketing/components/chat-component/chat-section/components/chat-message';
import { ChatHeader } from '@/components/pages/ticketing/components/chat-component/chat-section/components';
import { ChatSectionProps } from '@/components/pages/ticketing/components/chat-component/chat-section/interface';
import { useGetTicketDetail } from '@/services/ticketing/ticketing-list';
import { formatRelativeTime } from '@aibox/ui';
import { strings } from '@/constant';

const ChatSection: FC<ChatSectionProps> = ({ ticketId }) => {
  if (!ticketId) {
    return (
      <div className="h-[calc(100dvh-270px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm mt-1">{strings.chatStart}</p>
        </div>
      </div>
    );
  }

  const { data, isLoading, error } = useGetTicketDetail(ticketId);

  if (isLoading) {
    return (
      <div className="h-[calc(100dvh-250px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="h-[calc(100dvh-250px)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-400 text-sm mt-1">{strings.ticketStatus}</p>
        </div>
      </div>
    );
  }

  const ticket = data.data;
  return (
    <div className="flex flex-col bg-white border-r-1 border-gray-200">
      <ChatHeader ticket={ticket} formatRelativeTime={formatRelativeTime} />
      <div className="flex-1">
        <ChatMessage ticket={ticket} />
      </div>
    </div>
  );
};

export default ChatSection;
