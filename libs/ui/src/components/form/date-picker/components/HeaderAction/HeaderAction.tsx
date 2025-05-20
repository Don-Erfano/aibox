import { FC, PropsWithChildren } from 'react';

import { IHeaderAction } from './types';

const HeaderAction: FC<PropsWithChildren<IHeaderAction>> = ({
  onClick,
  children,
}) => (
  <div
    className="flex size-10 border border-transparent active:border-teal-600 cursor-pointer items-center justify-center
      rounded-xl px-2 py-1 hover:bg-zinc-200 hover:text-teal-600 text-zinc-700"
    onClick={onClick}
  >
    {children}
  </div>
);

export default HeaderAction;
