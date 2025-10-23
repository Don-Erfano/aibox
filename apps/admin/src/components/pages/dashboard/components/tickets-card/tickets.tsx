import { FC } from 'react';

import { strings } from '@/constant';
import { Card, TicketIcon } from '@aibox/ui';
import { useGetTicketsCount } from '@/services';

import { CardError } from '../error';
import { InformationSkeleton } from '../sekeltons';
import { useCardFilter } from '../../constants';
import { EmptyState } from '../empty-stat';

const TicketCard: FC = () => {
  const { filter, ...rest } = useCardFilter();
  const { data, error, isFetching, isLoading } = useGetTicketsCount(filter);
  if (error) {
    return <CardError />;
  }

  if (isLoading || isFetching) {
    return <InformationSkeleton />;
  }

  if (!data?.ticket_info.length) {
    return (
      <Card
        title={strings.mostSellerApis}
        {...rest}
        className="!h-[297px] bg-white [&>div[aria-label=card-header]]:leading-11"
      >
        <EmptyState />
      </Card>
    );
  }

  return (
    <Card
      {...rest}
      title={strings.tickets}
      className="!h-[297px] bg-white [&>div[aria-label=card-header]]:leading-11"
    >
      <div className="flex !h-[168px] flex-col justify-between gap-3 overflow-hidden pl-2 hover:overflow-auto">
        {data?.ticket_info.map((item, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center gap-2 text-gray-500">
              <TicketIcon />
              <div className="text-sm">
                <p className="leading-12 font-medium text-zinc-700">
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
