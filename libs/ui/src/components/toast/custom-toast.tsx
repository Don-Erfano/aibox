import clsx from 'clsx';
import { X } from 'lucide-react';

import { Button } from '../form';
import { toastTypesMap } from './constants';
import { CustomToastProps } from './interface';

export const CustomToast = (props: CustomToastProps) => {
  const { message, type, closeToast, options } = props;

  const toastType = toastTypesMap[type] || toastTypesMap.info;
  const duration = options?.autoClose || 5000;
  const isLoading = type === 'loading';

  return (
    <div className="bg-white relative pl-3 pr-4 py-2 gap-4 border-none">
      {!isLoading && (
        <div
          className={`absolute right-3 top-2 bottom-2 w-1 rounded-full overflow-hidden ${toastType.progressBgColor}`}
        >
          <div
            className="w-1 absolute bottom-0 bg-black opacity-30 animate-toast-progress origin-bottom"
            style={
              { '--toast-duration': `${duration}ms` } as React.CSSProperties
            }
          />
        </div>
      )}

      <div
        className={clsx('min-h-8 flex gap-4 items-center', {
          'ms-4': !isLoading,
        })}
      >
        <div className="flex items-center justify-center">{toastType.icon}</div>

        <div className="flex flex-col gap-2 flex-1">
          <p className="text-zinc-800 text-sm/6 font-normal">{message}</p>
          {options?.description && (
            <p className="text-zinc-600 text-sm/6 font-normal">
              {options.description}
            </p>
          )}
        </div>

        {options?.action && (
          <Button variant="link" size="sm" onClick={options.action.onClick}>
            {options.action.label}
          </Button>
        )}

        {options?.showCloseButton !== false && (
          <button className="cursor-pointer" onClick={closeToast}>
            <X className="text-neutral-400 size-4" />
          </button>
        )}
      </div>
    </div>
  );
};
