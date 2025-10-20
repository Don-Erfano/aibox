import clsx from "clsx";
import { X } from "lucide-react";

import { Button } from "../form";
import { toastTypesMap } from "./constants";
import { CustomToastProps } from "./interface";

export const CustomToast = (props: CustomToastProps) => {
  const { message, type, closeToast, options } = props;

  const toastType = toastTypesMap[type] || toastTypesMap.info;
  const duration = options?.autoClose || 5000;
  const isLoading = type === "loading";

  return (
    <div className="relative gap-4 border-none bg-white py-2 pr-4 pl-3">
      {!isLoading && (
        <div
          className={`absolute top-2 right-3 bottom-2 w-1 overflow-hidden rounded-full ${toastType.progressBgColor}`}
        >
          <div
            className="absolute bottom-0 w-1 origin-bottom animate-toast-progress bg-black opacity-30"
            style={
              { "--toast-duration": `${duration}ms` } as React.CSSProperties
            }
          />
        </div>
      )}

      <div
        className={clsx("flex min-h-8 items-center gap-4", {
          "ms-4": !isLoading,
        })}
      >
        <div className="flex items-center justify-center">{toastType.icon}</div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-sm/6 font-normal text-zinc-800">{message}</p>
          {options?.description && (
            <p className="text-sm/6 font-normal text-zinc-600">
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
            <X className="size-4 text-neutral-400" />
          </button>
        )}
      </div>
    </div>
  );
};
