'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { CopyPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Button,
  DataTable,
  Modal,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';

import { strings } from '@/constant';
import { GPU_ROUTES } from '@/routes';
import { FabButton } from '@/components/fab-button';
import { useGetConfigurationData } from '@/services';

import { ConfigurationCols } from './constants';

const ConfigurationList: FC = () => {
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const { configs, isFetching, isLoading, refetch, totalItems, totalPages } =
    useGetConfigurationData();
  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: configs,
    columns: ConfigurationCols,
    enableRowSelection: true,
    actions: {
      onDelete: (r) => setOpenModal(r.id),
      onEdit: (r) => push(`${GPU_ROUTES.CONFIGURATION}/${r.id}`),
      customActions: [
        {
          icon: <CopyPlus />,
          label: strings.duplicateConfiguration,
          onClick: () => console.log('click'),
        },
      ],
    },
    pageCount: totalPages,
  });

  return (
    <>
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
      <TableToolbar
        title={strings.configuration}
        totalItems={totalItems}
        table={table}
        refreshLoading={isFetching || isLoading}
        refetch={refetch}
        submitFilters={submitFilters}
        resetFilters={resetFilters}
        filterCount={filterCount}
        noManageColumns
      />
      <DataTable table={table} />
      <FabButton onClick={() => push(`${GPU_ROUTES.CONFIGURATION}/add`)} />
    </>
  );
};

export default ConfigurationList;
