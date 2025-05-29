import { FC } from 'react';

import { useGetTicketsCount } from '@/services';
import { CardError } from '../error';

const TicketCard: FC = () => {
  const { data } = useGetTicketsCount();
  console.log(data);
  return <CardError />;
};

export default TicketCard;
