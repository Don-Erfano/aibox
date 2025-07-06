'use client';

import { GPU_ROUTES } from '@/routes';
import { Button } from '@aibox/ui';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const ResourceList: FC = () => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <p>
          دسته‌بندی منابع{' '}
          <span className="rounded-full bg-slate-800 text-white px-1.5 py-0.5 min-w-6 !h-6 inline-block text-center">
            1
          </span>
        </p>
        <RefreshCcw />
      </div>
      <div className="w-full flex justify-center">
        <div
          className="px-4 py-6 flex flex-col gap-5 w-[300px] bg-contain h-[238px] outline outline-gray-200 rounded-xl shadow-[0px_2px_1px_0px_rgba(0,_0,_0,_0.20),_0px_1px_1px_0px_rgba(0,_0,_0,_0.14),_0px_1px_3px_0px_rgba(0,_0,_0,_0.12)]"
          style={{
            background: "url('/images/resource-card-bg.svg')",
          }}
        >
          <p className="text-center text-xl text-teal-600">JUPYTER</p>
          <hr className="border-teal-600 border-2 rounded" />
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2 text-sm text-teal-600 before:content-[''] before:size-2 before:bg-teal-600 before:block before:rounded-full">
              تعداد کل nodها:
              <span className="text-[#2F3233]">10</span>
            </p>
            <p className="flex items-center gap-2 text-sm text-teal-600 before:content-[''] before:size-2 before:bg-teal-600 before:block before:rounded-full">
              تعداد nodهای آزاد:
              <span className="text-[#2F3233]">2</span>
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => push(`${GPU_ROUTES.RESOURCE}/1`)}
          >
            مشاهده جزئیات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceList;
