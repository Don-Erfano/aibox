import { FC } from 'react';
import { TicketDetailProps } from './interface';
import {
  getPriorityColor,
  getStatusColor,
  ticketTranslations,
} from '@/components/pages/ticketing/utils/translation';

const TicketDetail: FC<TicketDetailProps> = ({
  id,
  username,
  status_name,
  message,
  priority,
  time,
  isSelected = false,
  onClick,
  unseenMessages,
}) => {
  return (
    <div
      className={`w-full px-4 hover:bg-gray-100 outline-1  outline-slate-200 py-3 transition-colors cursor-pointer ${
        isSelected ? 'bg-slate-200 ' : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-3">
        <div className="w-full flex items-center justify-between gap-x-3">
          <span className="text-slate-800 text-xs font-normal">{username}</span>
          <span
            className={`px-3 py-1 rounded-sm text-white text-[10px] font-normal ${getStatusColor(
              status_name
            )}`}
          >
            {ticketTranslations.status_name[status_name]}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <p className="w-100 text-zinc-600 text-[10px] font-normal leading-relaxed line-clamp-2 text-ellipsis">
          {message}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <span
            className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`}
          ></span>
          <span className="text-zinc-700 text-[10px] font-normal">
            {ticketTranslations.priority[priority]}
          </span>
        </div>
        <span className="text-zinc-600 text-[10px] font-light">{time}</span>
      </div>
    </div>
  );
};

export default TicketDetail;
