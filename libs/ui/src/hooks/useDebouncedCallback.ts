'use client';
import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <
  T extends (...args: Parameters<T>) => void
>(
  func: T,
  delayTime: number
) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        func(...args);
      }, delayTime);
    },
    [func, delayTime]
  );
};
