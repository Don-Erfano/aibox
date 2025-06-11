import { FC } from 'react';

import { useGetTicketsCount } from '@/services';
import { CardError } from '../error';
import { TicketIcon } from '../../icons';
import { Card } from '@/components/cards';

const TicketCard: FC = () => {
  const { data, error } = useGetTicketsCount();
  if (error) {
    return <CardError />;
  }
  return (
    <Card title="تیکت‌ها" className="gap-8 justify-start !h-[297px]">
      <div className="h-[168px] overflow-hidden hover:overflow-auto pl-2 flex gap-4 flex-col">
        {data?.ticket_info.map((item, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex gap-2 items-center text-gray-500">
              <TicketIcon />
              <div className="text-sm">
                <p className="font-medium text-zinc-700">
                  {item.category_name}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{item.ticket_count}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TicketCard;
