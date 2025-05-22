'use client';

import { FC, PropsWithChildren } from 'react';

const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1376px] xl:gap-x-[140px] 2xl:gap-x-[400px] xl:self-center grid grid-cols-1 gap-10 lg:place-content-between lg:grid-cols-[minmax(0,_480px)_minmax(0,_480px)] px-4 sm:px-8 md:px-16 lg:px-6 xl:px-[60px]">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
