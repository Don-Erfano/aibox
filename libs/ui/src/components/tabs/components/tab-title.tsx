import clsx from "clsx";
import type { TabTitleProps } from "../types";

export const TabTitle: React.FC<TabTitleProps> = ({ children, disabled }) => {
  return (
    <p
      className={clsx(
        "group-focus:text-teal-600 group-data-[state=active]:text-teal-600",
        "inline-block truncate text-base font-medium text-ellipsis whitespace-nowrap",
        disabled ? "text-gray-400" : "text-zinc-600 hover:text-teal-600",
      )}
    >
      {children}
    </p>
  );
};
