'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { strings } from '@/constant';
import { useGetDashboardInfo } from '@/services';
import { Card, AIIcon, APIIcon, GPUIcon, TicketIcon } from '@aibox/ui';
import {
  AI_SERVICES_ROUTES,
  API_PLATFORM_ROUTES,
  GPU_ROUTES,
  SUPPORT_ROUTES,
} from '@/routes';

const InfoCard: FC = () => {
  const { push } = useRouter();
  const { data, isFetching, isLoading } = useGetDashboardInfo();
  const infoCardData = [
    {
      color: 'bg-teal-600/12',
      icon: <APIIcon />,
      buttonLabel: strings.view,
      title: strings.waitingForAccept,
      iconColor: 'text-teal-600',
      route: `${API_PLATFORM_ROUTES.APIS}?page=1&status=WAITING`,
      count: data?.waiting_version_count,
    },
    {
      color: 'bg-teal-600/20',
      icon: <TicketIcon />,
      buttonLabel: strings.view,
      title: strings.notAnsweredTicket,
      iconColor: 'text-fuchsia-700',
      route: `${SUPPORT_ROUTES.TICKET}?tab=ticket-list&page=1&status_name=admin_answer`,
      count: data?.waiting_ticket_count,
    },
    {
      color: 'bg-orange-100',
      icon: <GPUIcon />,
      buttonLabel: strings.view,
      title: strings.inGpuQueue,
      route: `${GPU_ROUTES.SERVERS}?tab=servers&page=1&status=in_queue`,
      count: data?.gpu_queue_user_count,
    },
    {
      color: 'bg-slate-200',
      icon: <AIIcon />,
      buttonLabel: strings.view,
      title: strings.inApiQueue,
      route: `${AI_SERVICES_ROUTES.API_PARK}?tab=apis-queue&page=1&status=PENDING`,
      count: data?.api_queue_user_count,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-y-4 xl:grid-cols-4">
      {infoCardData.map((data, i) => (
        <Card
          key={i}
          hasFooter
          buttonLabel={data.buttonLabel}
          clickHandler={() => push(data.route)}
          loading={isLoading || isFetching}
          className="bg-white"
        >
          <div className="flex items-center justify-between sm:flex-col sm:gap-4 2xl:flex-row">
            <div className="flex items-center justify-between gap-2 self-start">
              <div
                className={clsx('rounded-md p-2', data.color, data.iconColor)}
              >
                {data.icon}
              </div>
              <p className="text-md font-medium text-zinc-700">{data.title}</p>
            </div>
            <h2
              className={clsx(
                'text-2xl leading-12 font-medium text-zinc-700 md:text-[28px] 2xl:text-4xl',
                {
                  'size-12 animate-pulse rounded-sm bg-gray-100':
                    isLoading || isFetching,
                  '': !isLoading || !isFetching,
                }
              )}
            >
              {data.count}
            </h2>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InfoCard;
