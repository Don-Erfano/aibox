'use client';
import { createContext, useContext, useState } from 'react';

interface PaddingContextValue {
  setFullWidth: (full: boolean) => void;
}

const PaddingContext = createContext<PaddingContextValue | undefined>(
  undefined
);

export function PaddingProvider({ children }: { children: React.ReactNode }) {
  const [fullWidth, setFullWidth] = useState(false);

  return (
    <PaddingContext.Provider value={{ setFullWidth }}>
      <div
        className={`${
          fullWidth
            ? 'py-[16px] lg:py-[24px]'
            : 'p-[16px] sm:px-[32px] md:p-[24px]'
        } w-full`}
      >
        {children}
      </div>
    </PaddingContext.Provider>
  );
}

export function useLayoutPadding() {
  const ctx = useContext(PaddingContext);
  if (!ctx) {
    throw new Error('useLayoutPadding must be used inside <PaddingProvider>');
  }
  return ctx;
}
