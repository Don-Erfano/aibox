'use client';
import { FC } from 'react';
import { useParams } from 'next/navigation';
import { ChatContainer } from '@/components/pages/ticketing/components/chat-component/container';

const ChatPageComponent: FC = () => {
  const params = useParams();
  const ticketId = params.id as string;

  return <ChatContainer ticket_id={ticketId} />;
};

export default ChatPageComponent;
