import { Trigger } from "@radix-ui/react-tabs";
import type { TabsTriggerPropsWithoutClassName } from "../types";
import clsx from "clsx";

export const TabsTrigger: React.FC<TabsTriggerPropsWithoutClassName> = ({
  disabled,
  ...props
}) => {
  return (
    <Trigger
      data-slot="tabs-trigger"
      className={clsx(
        "group h-full cursor-pointer border-b-[2.5px] border-transparent px-7 pt-0.5 pb-1 transition-all duration-150 focus:outline-none",
        "data-[state=active]:border-teal-600 data-[state=active]:shadow-none",
        { "!cursor-default": disabled },
      )}
      disabled={disabled}
      {...props}
    />
  );
};
