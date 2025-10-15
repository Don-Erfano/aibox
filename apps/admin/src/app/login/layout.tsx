"use client";

import { FC, PropsWithChildren } from "react";

const LoginLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex h-screen w-screen items-center justify-center bg-[#f6f6f6]">
    {children}
  </div>
);

export default LoginLayout;
