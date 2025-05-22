'use client';

import { Button } from '@aibox/ui';
import { ArrowLeft } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

const FormWrapper: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center h-12 px-4 py-3 sm:px-8 md:px-16 lg:px-4 bg-gray-100 border-b border-t border-gray-200">
        <h5 className="text-md font-medium text-slate-950">{title}</h5>
        <Button variant="ghost" size="icon">
          <ArrowLeft size={48} />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-10 lg:place-content-between lg:grid-cols-[minmax(0,_480px)_minmax(0,_480px)] px-4 py-10 sm:px-8 md:px-16 lg:px-6">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
