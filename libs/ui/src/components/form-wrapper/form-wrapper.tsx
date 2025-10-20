"use client";

import { FC, PropsWithChildren } from "react";

const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full flex-col">
      <div className="grid max-w-[1376px] grid-cols-1 gap-10 px-4 sm:px-8 md:px-16 lg:grid-cols-[minmax(0,_480px)_minmax(0,_480px)] lg:place-content-between lg:px-6 xl:gap-x-[140px] xl:self-center xl:px-[60px] 2xl:gap-x-[400px]">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
