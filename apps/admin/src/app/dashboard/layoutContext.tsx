'use client';
import { createContext, useContext, useState } from 'react';
import clsx from 'clsx';

interface LayoutModeContextValue {
  setMode: (mode: ModesType) => void;
}

const LayoutModeContext = createContext<LayoutModeContextValue | undefined>(
  undefined
);

const paddingVariants = {
  full: 'py-[16px] lg:py-[24px]',
  default: 'p-[16px] sm:px-[32px] md:p-[24px]',
} as const;

type ModesType = keyof typeof paddingVariants;

export function LayoutModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ModesType>('default');

  return (
    <LayoutModeContext.Provider value={{ setMode }}>
      <div className={clsx('w-full', paddingVariants[mode])}>{children}</div>
    </LayoutModeContext.Provider>
  );
}

export function useLayoutPadding() {
  const ctx = useContext(LayoutModeContext);
  if (!ctx) {
    throw new Error(
      'useLayoutPadding must be used inside <LayoutModeProvider>'
    );
  }
  return ctx;
}
