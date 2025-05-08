'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { X as CloseIcon } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';

import { ModalProps } from './interface';

const useModal = () => {
  const [open, setOpen] = useState(false);

  const Modal: FC<PropsWithChildren<Partial<ModalProps>>> = ({
    title,
    headerIcon,
    children,
    onClose,
  }) => {
    const handleModalToggle = (isOpen: boolean) => {
      if (!isOpen && onClose) onClose();
      setOpen(isOpen);
    };

    return (
      <DialogPrimitive.Root open={open} onOpenChange={handleModalToggle}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed  inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out" />
          <DialogPrimitive.Content
            className="fixed top-1/2 left-1/2 z-50 w-[320px] md:w-[480px] max-h-[90dvh] translate-x-[-50%] translate-y-[-50%] overflow-visible rounded-lg border-0 bg-white shadow-[0_5px_5px_0_rgba(0,0,0,0.20),0_8px_10px_0px_rgba(0,0,0,0.14),0_3px_14px_0px_rgba(0,0,0,0.12)] [&>button]:hidden"
            dir="rtl"
          >
            <div
              className={clsx(
                'bg-teal-600 border-0 border-teal-600 px-3 py-4 text-black rounded-t-md flex flex-row items-center justify-between',
                { 'h-20': headerIcon }
              )}
            >
              <DialogPrimitive.Title
                className={clsx('text-white text-lg font-semibold', {
                  'mx-auto -mt-24': headerIcon,
                })}
              >
                {headerIcon || title}
              </DialogPrimitive.Title>

              <DialogPrimitive.Close asChild>
                <CloseIcon className="text-white" />
              </DialogPrimitive.Close>
            </div>

            <div className="p-6">{children}</div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  };

  return { Modal, open, setOpen };
};

export default useModal;
