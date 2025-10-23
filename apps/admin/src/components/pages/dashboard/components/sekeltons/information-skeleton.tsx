import { Card } from '@aibox/ui';
import { FC } from 'react';

const InformationSkeleton: FC = () => (
  <Card className="!h-[297px]">
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <div className="rounded-md bg-slate-200 p-2">
          <div className="size-11 animate-pulse bg-gray-100" />
        </div>
        <div className="h-7 w-full animate-pulse bg-gray-100" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="h-12 w-full animate-pulse bg-gray-100" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-12 w-full animate-pulse bg-gray-100" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-12 w-full animate-pulse bg-gray-100" />
        </div>
      </div>
    </div>
  </Card>
);

export default InformationSkeleton;
