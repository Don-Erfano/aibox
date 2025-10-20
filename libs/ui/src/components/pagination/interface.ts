import { ComponentProps } from "react";

export interface PaginationProps extends ComponentProps<"div"> {
  page: number;
  pageSize: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}
