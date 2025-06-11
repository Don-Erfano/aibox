'use client';

import { FC, PropsWithChildren } from 'react';

const LoginLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="w-screen h-screen bg-[#f6f6f6] flex justify-center items-center">
    {children}
  </div>
);

export default LoginLayout;
