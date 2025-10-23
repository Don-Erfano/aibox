'use client';

import { FC } from 'react';

import {
  DataTable,
  FormContainer,
  TableContainer,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';

import { strings } from '@/constant';
import { modelCol } from './constants';
import { useParams } from 'next/navigation';
import { useGetNodes } from '@/services/gpu';

const ModelInfo: FC = () => {
  const { id, slug } = useParams();
  const { nodes, totalItems, totalPages } = useGetNodes({
    scope: id as string,
    profile: slug as string,
  });
  const { table } = useDataTable({
    data: nodes,
    columns: modelCol,
    pageCount: totalPages,
  });
  return (
    <FormContainer title={`${id} - ${slug}`}>
      <TableContainer hasYPadding={false}>
        <TableToolbar
          title={strings.nodes}
          totalItems={totalItems}
          table={table}
          searchPlaceholder={strings.searchIn([
            strings.nodeName,
            strings.podName,
          ])}
        />
        <DataTable table={table} />
      </TableContainer>
    </FormContainer>
  );
};
export default ModelInfo;
