'use client';

import { FC } from 'react';

import {
  DataTable,
  DataTableSkeleton,
  FormContainer,
  TableContainer,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';

import { strings } from '@/constant';
import { resourceCol } from './constants';
import {
  IResourceDetailResponsePayload,
  useGetResourceDetail,
} from '@/services/gpu';
import { useParams } from 'next/navigation';

const ResourceList: FC = () => {
  const { id } = useParams();
  const { resourceDetail, totalItems, totalPages, isFetching, isLoading } =
    useGetResourceDetail({
      scope: id as string,
    });

  const { table } = useDataTable({
    data: (resourceDetail as IResourceDetailResponsePayload).resources,
    columns: resourceCol(
      (resourceDetail as IResourceDetailResponsePayload).profiles || []
    ),
    pageCount: totalPages,
  });

  if (isFetching || isLoading) return <DataTableSkeleton columnCount={10} />;

  return (
    <FormContainer title={id as string}>
      <TableContainer hasYPadding={false}>
        <TableToolbar
          title={strings.models}
          totalItems={totalItems}
          table={table}
          searchPlaceholder={strings.searchIn([
            strings.modelName,
            strings.totalCount,
            strings.freeCount,
            strings.modelInfo,
          ])}
        />
        <DataTable table={table} />
      </TableContainer>
    </FormContainer>
  );
};
export default ResourceList;
