'use client';

import { FC } from 'react';

import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { strings } from '@/constant';

import { errorsCol } from './constants';
import { useGetErrors, useGetServerProfiles } from '@/services/gpu';

const Errorslist: FC = () => {
  const { errors, totalItems, totalPages, isFetching, isLoading } =
    useGetErrors();

  const { data: profiles, isLoading: profileLoading } = useGetServerProfiles();

  const { table } = useDataTable({
    data: errors,
    columns: errorsCol({ profiles }),
    pageCount: totalPages,
  });

  if (isLoading || isFetching || profileLoading)
    return <DataTableSkeleton columnCount={10} />;

  return (
    <>
      <TableToolbar
        title={strings.errors}
        totalItems={totalItems}
        table={table}
        searchPlaceholder={strings.searchIn([
          strings.userName,
          strings.processor,
          strings.errorMessage,
        ])}
      />

      <DataTable table={table} />
    </>
  );
};
export default Errorslist;
