'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import { strings } from '@/constant';
import { GPU_ROUTES } from '@/routes';
import {
  DataTable,
  DataTableSkeleton,
  FabButton,
  TableContainer,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { useGetMotherboardsList } from '@/services/gpu';

import { motherboardCols } from './constants';
import DeleteModal from './delete-modal';

const MotherboardList: FC = () => {
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const { motherboards, totalItems, totalPages, isFetching, isLoading } =
    useGetMotherboardsList();
  const { table } = useDataTable({
    data: motherboards,
    columns: motherboardCols,
    enableRowSelection: true,
    actions: {
      onDelete: (r) => setOpenModal(r.id),
      onEdit: (r) => push(`${GPU_ROUTES.MOTHERBOARDS}/${r.id}`),
    },
    pageCount: totalPages,
  });

  if (isLoading || isFetching)
    return (
      <TableContainer>
        <DataTableSkeleton columnCount={10} />
      </TableContainer>
    );

  return (
    <TableContainer>
      <DeleteModal handleClose={(s) => setOpenModal(s)} openModal={openModal} />
      <TableToolbar
        title={strings.motherboards}
        totalItems={totalItems}
        table={table}
        searchPlaceholder={strings.searchIn([
          strings.model,
          strings.ram,
          strings.cores,
        ])}
      />
      <DataTable table={table} />
      <FabButton onClick={() => push(`${GPU_ROUTES.MOTHERBOARDS}/add`)} />
    </TableContainer>
  );
};
export default MotherboardList;
