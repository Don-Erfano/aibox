'use client';

import { FC } from 'react';
import { RefreshCcw } from 'lucide-react';

import { Button, TableContainer } from '@aibox/ui';
import { useGetResources } from '@/services/gpu';

import ResourceCard from './resource-card';

const ResourceList: FC = () => {
  const { data, refetch } = useGetResources();
  return (
    <TableContainer>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p>
            دسته‌بندی منابع{' '}
            <span className="inline-block !h-6 min-w-6 rounded-full bg-slate-800 px-1.5 py-0.5 text-center text-white">
              {data?.length}
            </span>
          </p>
          <Button variant="ghost" size="icon" onClick={() => refetch()}>
            <RefreshCcw />
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-5 pb-8 lg:flex-nowrap">
          {data?.map((d: any) => (
            <ResourceCard key={d.scope} {...d} />
          ))}
        </div>
      </div>
    </TableContainer>
  );
};

export default ResourceList;
