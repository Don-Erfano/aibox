import { Root } from "@radix-ui/react-tabs";
import type { TabsPropsWithoutClassName } from "../types";

export const Tabs: React.FC<TabsPropsWithoutClassName> = ({ ...props }) => {
  return (
    <Root
      data-slot="tabs"
      className="flex w-full flex-col gap-8 xl:gap-10"
      {...props}
    />
  );
};
