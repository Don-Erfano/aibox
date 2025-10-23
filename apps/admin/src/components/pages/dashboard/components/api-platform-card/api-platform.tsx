import { FC } from 'react';

import { strings } from '@/constant';
import { useGetApiPlatformData } from '@/services';
import { Card, DonutChart, APIIcon } from '@aibox/ui';

import { AnalysisSkeleton } from '../sekeltons';
import { useCardFilter } from '../../constants';

const ApiPlatformCard: FC = () => {
  const { filter, ...rest } = useCardFilter();
  const { data, isLoading } = useGetApiPlatformData(filter);

  const waiting = data?.version_info.find((v) => v.status === 'WAITING')?.count;
  const accepted = data?.version_info.find(
    (v) => v.status === 'ACCEPTED'
  )?.count;
  const deprecated = data?.version_info.find(
    (v) => v.status === 'DEPRECATED'
  )?.count;
  const notAccepted = data?.version_info.find(
    (v) => v.status === 'NOT_ACCEPTED'
  )?.count;

  const chartData = [
    { id: '1', name: strings.approved, amount: accepted || 0 },
    { id: '2', name: strings.waitingForAccept, amount: waiting || 0 },
    { id: '3', name: strings.rejected, amount: notAccepted || 0 },
    { id: '4', name: strings.deprecated, amount: deprecated || 0 },
  ];

  const colors = ['#34B853', '#DD4B39', '#B00020', '#757E7F'];

  if (isLoading)
    return (
      <Card
        title={strings.apiPlatform}
        className="col-span-1 flex justify-start !gap-8 bg-white md:col-span-2 xl:col-span-1 2xl:col-auto"
      >
        <AnalysisSkeleton />
      </Card>
    );

  return (
    <Card
      title={strings.apiPlatform}
      className="col-span-1 flex justify-start !gap-8 bg-white md:col-span-2 xl:col-span-1 2xl:col-auto"
      {...rest}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <DonutChart data={chartData} colors={colors} />
          <div className="flex w-fit flex-col">
            <h2 className="text-left text-4xl leading-14 font-medium text-zinc-700">
              {data?.total_count}
            </h2>
            <span className="text-sm font-normal text-zinc-700">
              {strings.totalVersions}
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-600/12 p-2 text-green-600">
                <APIIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.approved}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {accepted || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-600/12 p-2 text-orange-700">
                <APIIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.waitingForAccept}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {waiting || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-600/12 p-2 text-red-600">
                <APIIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.rejected}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {notAccepted || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-600/12 p-2 text-gray-500">
                <APIIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.deprecated}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {deprecated || 0}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApiPlatformCard;
