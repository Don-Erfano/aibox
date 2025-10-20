import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

const TableContainer: FC<PropsWithChildren<{ hasYPadding?: boolean }>> = ({
  children,
  hasYPadding = true,
}) => {
  return (
    <div
      className={clsx("overflow-auto px-4 sm:px-8 md:px-16 lg:px-8 2xl:px-11", {
        "pt-8 2xl:pt-10": hasYPadding,
      })}
    >
      {children}
    </div>
  );
};

export default TableContainer;
