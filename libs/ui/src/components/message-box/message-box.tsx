import { PropsWithChildren, useCallback } from "react";
import {
  CircleAlert,
  CircleCheck,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";

import { IMessageBox } from "./interface";
import clsx from "clsx";

const MessageBox = (props: PropsWithChildren<IMessageBox>) => {
  const {
    message,
    children,
    hasIcon = true,
    size = "fix",
    variant = "info",
    className,
  } = props;

  const bgColor = {
    "bg-neutral-100": variant === "info",
    "bg-red-100": variant === "error",
    "bg-orange-100": variant === "warning",
    "bg-green-100": variant === "success",
  };
  const outlineColors = {
    "outline-red-600": variant === "error",
    "outline-slate-200": variant === "info",
    "outline-orange-500": variant === "warning",
    "outline-green-600": variant === "success",
  };
  const textColors = {
    "text-red-600": variant === "error",
    "text-zinc-900":
      variant === "info" || variant === "warning" || variant == "success",
  };

  const MessageBoxIcon = useCallback(() => {
    let Icon = null;
    if (hasIcon) {
      switch (variant) {
        case "error":
          Icon = (
            <CircleAlert width={20} height={20} className="text-red-600" />
          );
          break;

        case "warning":
          Icon = (
            <TriangleAlert width={20} height={20} className="text-orange-500" />
          );
          break;

        case "success":
          Icon = (
            <CircleCheck width={20} height={20} className="text-green-600" />
          );
          break;

        default:
          Icon = (
            <OctagonAlert width={20} height={20} className="text-zinc-900" />
          );
          break;
      }
      return <div className="size-5">{Icon}</div>;
    } else {
      return null;
    }
  }, [variant, hasIcon]);

  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-5 rounded-md px-3 py-2 outline",
        {
          ...bgColor,
          ...outlineColors,
          "w-[250px]": size === "fix",
          "w-fit": size === "full",
        },
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <MessageBoxIcon />
        <span
          className={clsx("text-justify text-sm leading-6", {
            ...textColors,
          })}
        >
          {message}
        </span>
      </div>
      {children}
    </div>
  );
};

export default MessageBox;
