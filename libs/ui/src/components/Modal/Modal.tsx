'use client';

import clsx from 'clsx';
import { X as CloseIcon } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui';
import { ModalProps } from './interface';

const useModal = () => {
  const [open, setOpen] = useState(false);

  const Modal: FC<PropsWithChildren<ModalProps>> = ({
    title,
    headerIcon,
    children,
  }) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 w-[360px] md:w-[480px] border-none bg-white [&>button]:hidden shadow-[0_5px_5px_0_rgba(0,0,0,0.20),0_8px_10px_0px_rgba(0,0,0,0.14),0_3px_14px_0px_rgba(0,0,0,0.12)]">
          <DialogHeader
            className={clsx(
              'bg-teal-600 px-3 py-4 text-black rounded-t-md flex flex-row items-center justify-between',
              { 'h-20': headerIcon }
            )}
          >
            <DialogTitle
              className={clsx('text-white ', { 'mx-auto -mt-24': headerIcon })}
            >
              {headerIcon || title}
            </DialogTitle>

            <DialogClose asChild>
              <CloseIcon className="text-white" />
            </DialogClose>
          </DialogHeader>

          <div className="p-6 pt-8 overflow-auto max-h-[90dvh]">{children}</div>
        </DialogContent>
      </Dialog>
    );
  };

  return { Modal, open, setOpen };
};

export default useModal;
