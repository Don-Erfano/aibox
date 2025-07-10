import { FC } from 'react';
import { ChatHeaderProps } from './interface';
import { strings } from '@/constant';
import Image from 'next/image';

const ChatHeader: FC<ChatHeaderProps> = ({ ticket, formatRelativeTime }) => {
  return (
    <div className="flex w-full items-center px-6 py-[3px] justify-between bg-white border-b border-r border-r-gray-200 border-gray-200 shadow-xl z-10">
      <div className="flex-col">
        <h5 className="text-zinc-800 font-semibold text-lg">
          {ticket.subject}
        </h5>
        <div className="flex gap-x-1 mt-1">
          <p className="text-xs text-zinc-600">
            {strings.createdBy}
            {ticket.user_id} -
          </p>
          <p className="text-xs text-zinc-600">
            {' '}
            {formatRelativeTime(ticket.messages[0].created_at)} -
          </p>
          <p className="text-xs text-zinc-600"> {ticket.category} -</p>
          <p className="text-xs text-zinc-600"> {ticket.answer}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-2">
        <p className="text-sm text-zinc-700 font-medium">
          {ticket.operator_id}
        </p>
        <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-zinc-300 overflow-hidden flex-shrink-0 shadow-sm">
          <Image
            src={ticket.operator_avatar}
            alt={ticket.operator_id}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
