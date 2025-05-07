import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  LeftChevronIcon,
  RightChevronIcon,
} from '@/assets/icons';
import {
  FlexContainer,
  Footer,
  PaginationButton,
  PaginationContainer,
  PaginationInput,
  PaginationSelect,
} from '../styled';
import { translations } from '../constant';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex + 1;
  const selectedRowLength = table.getFilteredSelectedRowModel().rows.length;

  return (
    <Footer>
      <FlexContainer>
        {selectedRowLength > 0 && `${selectedRowLength} سطر انتخاب شده`}
      </FlexContainer>
      <PaginationContainer>
        <FlexContainer>
          {translations.goToPage}
          <PaginationInput
            type="number"
            min={1}
            max={pageCount}
            defaultValue={pageIndex}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </FlexContainer>
        <PaginationButton
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          aria-label="صفحه آخر"
        >
          <ChevronsRightIcon />
        </PaginationButton>
        <PaginationButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="بعدی"
        >
          <RightChevronIcon />
        </PaginationButton>
        <PaginationButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="قبلی"
        >
          <LeftChevronIcon />
        </PaginationButton>
        <PaginationButton
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="صفحه اول"
        >
          <ChevronsLeftIcon />
        </PaginationButton>
        <FlexContainer>
          {translations.pageInfo(pageIndex, pageCount)}
        </FlexContainer>

        <PaginationSelect
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          aria-label="تعداد نمایش"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {translations.show(size)}
            </option>
          ))}
        </PaginationSelect>
      </PaginationContainer>
    </Footer>
  );
}
