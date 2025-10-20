"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { X as CloseIcon } from "lucide-react";
import { FC } from "react";
import { ModalProps } from "./interface";

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
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <DialogPrimitive.Content
          aria-describedby=""
          className="fixed top-1/2 left-1/2 z-50 max-h-[90dvh] w-[320px] translate-x-[-50%] translate-y-[-50%] overflow-visible rounded-lg border-0 bg-white shadow-[0_5px_5px_0_rgba(0,0,0,0.20),0_8px_10px_0px_rgba(0,0,0,0.14),0_3px_14px_0px_rgba(0,0,0,0.12)] sm:w-[480px] [&>button]:hidden"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div
            className={clsx(
              "relative flex items-center rounded-t-md border-0 bg-teal-600 px-4 text-black",
              {
                "h-20 justify-center py-4": headerIcon,
                "justify-between py-[10px]": !headerIcon,
              },
            )}
          >
            {headerIcon ? (
              <>
                <DialogPrimitive.Close asChild>
                  <div className="absolute top-5 left-3 -translate-y-1/2 cursor-pointer">
                    <CloseIcon className="cursor-pointer text-neutral-300 hover:text-white" />
                  </div>
                </DialogPrimitive.Close>

                <div className="absolute -top-1 -translate-y-1/2 text-white">
                  {headerIcon}
                </div>
              </>
            ) : (
              <>
                <DialogPrimitive.Title className="text-base font-medium text-white">
                  {title || ""}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close asChild>
                  <CloseIcon className="cursor-pointer text-neutral-300 hover:text-white" />
                </DialogPrimitive.Close>
              </>
            )}
          </div>

          <div className="px-4 pt-8 pb-6 sm:px-6">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
