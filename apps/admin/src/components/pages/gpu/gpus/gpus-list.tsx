'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  DataTable,
  DataTableSkeleton,
  FabButton,
  TableContainer,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { strings } from '@/constant';
import { GPU_ROUTES } from '@/routes';
import { useGetGpusList } from '@/services/gpu';

import { GpuCols } from './constants';
import DeleteModal from './delete-modal';

const GpusList: FC = () => {
  const { push } = useRouter();
  const { gpus, totalItems, totalPages, isLoading } = useGetGpusList();

  const [openModal, setOpenModal] = useState<string | undefined>(undefined);

  const { table } = useDataTable({
    data: gpus,
    columns: GpuCols,
    enableRowSelection: true,
    actions: {
      onDelete: (r) => setOpenModal(r.id),
      onEdit: (r) => push(`${GPU_ROUTES.GPUS}/edit/${r.id}`),
    },
    pageCount: totalPages,
  });

  if (isLoading)
    return (
      <TableContainer>
        <DataTableSkeleton columnCount={10} />
      </TableContainer>
    );

  return (
    <TableContainer>
      <DeleteModal
        handleClose={() => {
          setOpenModal(undefined);
        }}
        openModal={openModal}
      />
      <TableToolbar
        title={strings.gpus}
        totalItems={totalItems}
        table={table}
        searchPlaceholder="جستجو در مدل، رم، برند، تعداد هسته و reliability"
      />
      <DataTable table={table} />
      <FabButton onClick={() => push(`${GPU_ROUTES.GPUS}/add`)} />
    </TableContainer>
  );
};
export default GpusList;
