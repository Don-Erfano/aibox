'use client';

import { X as CloseIcon } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { FC } from 'react';

import { ModalProps } from './interface';
import clsx from 'clsx';

export const Modal: FC<ModalProps> = ({
  title,
  headerIcon,
  trigger,
  children,
  onClose,
  open,
  onOpenChange,
}) => {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (onOpenChange) onOpenChange(isOpen);
        if (!isOpen && onClose) onClose();
      }}
    >
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
        <DialogPrimitive.Content
          dir="rtl"
          className="fixed top-1/2 left-1/2 z-50 w-[320px] sm:w-[480px] max-h-[90dvh] translate-x-[-50%] translate-y-[-50%] overflow-visible rounded-lg border-0 bg-white shadow-[0_5px_5px_0_rgba(0,0,0,0.20),0_8px_10px_0px_rgba(0,0,0,0.14),0_3px_14px_0px_rgba(0,0,0,0.12)] [&>button]:hidden"
        >
          <div
            className={clsx(
              'bg-teal-600 border-0 p-3 text-black rounded-t-md relative flex items-center',
              {
                'h-20 justify-center': headerIcon,
                'justify-between': !headerIcon,
              }
            )}
          >
            {headerIcon ? (
              <>
                <DialogPrimitive.Close asChild>
                  <div className="absolute left-3 top-5 -translate-y-1/2 cursor-pointer">
                    <CloseIcon className="text-neutral-300 hover:text-white transition-colors duration-300" />
                  </div>
                </DialogPrimitive.Close>

                <div className="text-white absolute -top-1/5 -translate-y-1/2">
                  {headerIcon}
                </div>
              </>
            ) : (
              <>
                <DialogPrimitive.Title className="text-white text-base font-medium">
                  {title}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close asChild>
                  <CloseIcon className="text-neutral-300 hover:text-white transition-colors duration-300" />
                </DialogPrimitive.Close>
              </>
            )}
          </div>

          <div className="pt-8 px-4 sm:px-6 pb-6">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
