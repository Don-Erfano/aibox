'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Button,
  DataTable,
  Modal,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';

import { strings } from '@/constant';
import { logsCol } from './constants';
import * as data from './data.json';
import { GPU_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';
import Image from 'next/image';
import { RefreshCcw } from 'lucide-react';

const LogsList: FC = () => {
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: data,
    columns: logsCol,
    enableRowSelection: true,
    actions: {
      onDelete: (r) => setOpenModal(r.id),
      customActions: [
        {
          icon: <RefreshCcw />,
          label: 'تغییر بسته',
          onClick: (r) => push(`${GPU_ROUTES.LOGS}/change-package/1`),
        },
      ],
    },
    pageCount: 1,
  });

  return (
    <div>
      <Modal
        open={!!openModal}
        onClose={() => setOpenModal(undefined)}
        headerIcon={
          <Image
            src="/images/delete-modal-header.svg"
            alt="delete-modal-header"
            width={220}
            height={168}
            className="mb-2.5"
          />
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm font-medium text-zinc-900">
            {strings.deleteModalTitle}
          </p>
          <p className="text-center text-sm font-normal text-gray-800">
            {strings.deleteConfiguration}
          </p>
          <div className="flex gap-5 justify-center mt-5">
            <Button size="lg" isFilled>
              {strings.remove}
            </Button>
            <Button size="lg" onClick={() => setOpenModal(undefined)}>
              {strings.cancel}
            </Button>
          </div>
        </div>
      </Modal>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.gpus}
          totalItems={0}
          table={table}
          refreshLoading={false}
          refetch={() => false}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />

        <DataTable table={table} />
      </div>
      <FabButton onClick={() => push(`${GPU_ROUTES.GPUS}/add`)} />
    </div>
  );
};
export default LogsList;
