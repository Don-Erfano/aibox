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
import { seversCol } from './constants';
import { GPU_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';
import Image from 'next/image';
import CollapseRow from './server-row-collapse';
import { Power, SquareTerminal } from 'lucide-react';

const ServersList: FC = () => {
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: [
      {
        model: '3080',
        ram: 'نام پردازنده',
        coda_core: '1401/12/27 13:30',
        finishReserve: '1402/01/27 13:36',
        status: 'درحال استفاده',
        id: '12',
      },
    ],
    columns: seversCol,
    enableExpand: true,
    actions: {
      customActions: [
        {
          icon: <Power />,
          label: strings.downServer,
          onClick: (row) => setOpenModal(row.id),
        },
        {
          icon: <SquareTerminal size={22} />,
          label: strings.seeLogs,
          onClick: () => console.log('123'),
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
            src="/images/warning-modal-icon.svg"
            alt="warning-modal-icon"
            width={148}
            height={121}
          />
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm font-medium text-zinc-900">
            {strings.deleteModalTitle}
          </p>
          <p className="text-center text-sm font-normal text-gray-800">
            {strings.downSeverDescription}
          </p>
          <div className="flex gap-5 justify-center mt-5">
            <Button size="lg" isFilled>
              {strings.approve}
            </Button>
            <Button size="lg" onClick={() => setOpenModal(undefined)}>
              {strings.cancel}
            </Button>
          </div>
        </div>
      </Modal>
      <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={strings.server}
          totalItems={0}
          table={table}
          refreshLoading={false}
          refetch={() => false}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />

        <DataTable table={table} childComponent={CollapseRow} />
      </div>
      <FabButton onClick={() => push(`${GPU_ROUTES.MOTHERBOARDS}/add`)} />
    </div>
  );
};
export default ServersList;
