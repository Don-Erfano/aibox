'use client';
import useEnhancedEffect from '../useEnhancedEffect';
import { useRef } from 'react';

function useEventCallback<
  Fn extends (...args: any[]) => any = (...args: unknown[]) => unknown
>(fn: Fn): Fn;
function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return;
function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return useRef((...args: Args) =>
    // @ts-expect-error hide `this`
    (0, ref.current!)(...args)
  ).current;
}

export default useEventCallback;
