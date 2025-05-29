'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/cards';
import { useGetDashboardInfo } from '@/services';

import { AIIcon, APIIcon, GPUIcon, TicketIcon } from '../../icons';

const InfoCard: FC = () => {
  const { push } = useRouter();
  const { data } = useGetDashboardInfo();
  const infoCardData = [
    {
      color: 'bg-teal-600/12',
      icon: <APIIcon />,
      buttonLabel: 'مشاهده',
      title: 'API در انتظار تأیید',
      route: '',
      count: data?.waiting_version_count,
    },
    {
      color: 'bg-teal-600/20',
      icon: <TicketIcon />,
      buttonLabel: 'مشاهده',
      title: 'تیکت در انتظار پاسخ',
      route: '',
      count: data?.waiting_ticket_count,
    },
    {
      color: 'bg-ornage-100/20',
      icon: <GPUIcon />,
      buttonLabel: 'مشاهده',
      title: 'کاربر در صف رایانش گرافیکی',
      route: '',
      count: data?.gpu_queue_user_count,
    },
    {
      color: 'bg-slate-200',
      icon: <AIIcon />,
      buttonLabel: 'مشاهده',
      title: 'کاربر در صف استفاده از API',
      route: '',
      count: data?.api_queue_user_count,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-y-4">
      {infoCardData.map((data, i) => (
        <Card
          key={i}
          hasFooter
          buttonLabel={data.buttonLabel}
          clickHandler={() => push(data.route)}
        >
          <div className="flex justify-between items-center sm:flex-col sm:gap-4 2xl:flex-row">
            <div className="flex justify-between items-center gap-2 self-start">
              <div
                className={clsx('bg-teal-600/12 p-2 rounded-md', data.color)}
              >
                {data.icon}
              </div>
              <p>{data.title}</p>
            </div>
            <h2 className="text-2xl md:text-[28px] font-medium leading-12 2xl:text-4xl">
              {data.count}
            </h2>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InfoCard;
