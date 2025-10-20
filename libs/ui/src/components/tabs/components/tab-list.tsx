import { List } from "@radix-ui/react-tabs";
import type { TabsListPropsWithoutClassName } from "../types";

export const TabsList: React.FC<TabsListPropsWithoutClassName> = ({
  ...props
}) => {
  return (
    <List
      data-slot="tabs-list"
      className="scrollbar-hide flex w-full items-center gap-4 overflow-x-auto border-b-[2.5px] border-b-gray-100 lg:gap-6"
      {...props}
    />
  );
};
