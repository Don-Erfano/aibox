import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@aibox/ui';
import { IResource } from '@/services/gpu';
import { GPU_ROUTES } from '@/routes';

const ResourceCard: FC<IResource> = ({ free, scope, total }) => {
  const { push } = useRouter();
  return (
    <div
      className="flex h-[238px] w-full flex-col gap-5 rounded-xl bg-contain px-4 py-6 shadow-[0px_2px_1px_0px_rgba(0,_0,_0,_0.20),_0px_1px_1px_0px_rgba(0,_0,_0,_0.14),_0px_1px_3px_0px_rgba(0,_0,_0,_0.12)] outline outline-gray-200 sm:w-[240px] md:w-[342px] lg:w-[286px] xl:w-[300px]"
      style={{
        background: "url('/images/resource-card-bg.svg')",
      }}
    >
      <p className="text-center text-xl text-teal-600">{scope}</p>
      <hr className="rounded border-2 border-teal-600" />
      <div className="flex flex-col gap-4">
        <p className="flex items-center gap-2 text-sm text-teal-600 before:block before:size-2 before:rounded-full before:bg-teal-600 before:content-['']">
          تعداد کل nodeها:
          <span className="text-[#2F3233]">{total}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-teal-600 before:block before:size-2 before:rounded-full before:bg-teal-600 before:content-['']">
          تعداد nodeهای آزاد:
          <span className="text-[#2F3233]">{free}</span>
        </p>
      </div>
      <Button
        variant="outline"
        size="full"
        onClick={() => push(`${GPU_ROUTES.RESOURCE}/${scope}`)}
      >
        مشاهده جزئیات
      </Button>
    </div>
  );
};

export default ResourceCard;
