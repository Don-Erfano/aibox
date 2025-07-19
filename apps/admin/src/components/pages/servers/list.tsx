'use client';

import { useState } from 'react';
import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  Terminal,
  useDataTable,
} from '@aibox/ui';
import { strings } from '@/constant';
import {
  useDeploymentList,
  useDeployServer,
} from '@/services/operation-service';
import serversColumns from './constant';
import { CirclePlay, Power, SquareTerminal } from 'lucide-react';
import { DeleteModal } from './componenrs/interface';
import { StopServerModal } from './componenrs/stop-server-modal';
import { ServerListChild } from './componenrs/server-list-child';
import { StartServerModal } from './componenrs/start-server-modal';

const Servers = () => {
  const [deleteModalState, setDeleteModalState] = useState<DeleteModal>({
    show: false,
    id: '0',
  });
  const [deployModalState, setDeployModalState] = useState<DeleteModal>({
    show: false,
    id: '0',
  });
  const [showTerminal, setShowTerminal] = useState<boolean>(false);
  const { servers, isLoading, totalItems, totalPages, refetch } =
    useDeploymentList();
  const { isPending } = useDeployServer();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: servers,
    columns: serversColumns,
    pageCount: totalPages,
    enableExpand: true,
    actions: {
      customActions: [
        {
          icon: <SquareTerminal strokeWidth={1.5} className="size-5" />,
          label: strings.seeLogs,
          onClick: () => setShowTerminal(true),
        },
        {
          icon: (row) =>
            row.is_up ? (
              <Power strokeWidth={1.5} className="size-5" />
            ) : (
              <CirclePlay strokeWidth={1.5} className="size-5" />
            ),
          label: (row) =>
            row.is_up ? strings.shutdownServer : strings.deployServer,
          disabled: isPending,
          onClick: (row) =>
            row.is_up
              ? setDeleteModalState({ show: true, id: row.deployment_name })
              : setDeployModalState({ show: true, id: row.deployment_name }),
        },
      ],
    },
  });

  if (isLoading) return <DataTableSkeleton columnCount={4} />;

  return (
    <>
      <div className="relative shadow-2xl px-11 py-5 rounded-sm">
        <StopServerModal
          modalState={deleteModalState}
          toggleModal={setDeleteModalState}
        />

        <StartServerModal
          modalState={deployModalState}
          toggleModal={setDeployModalState}
        />

        <Terminal
          commands={'adsadad'}
          title={
            <div className="flex gap-2">
              <p>Deploy</p>/<p>Image</p>
            </div>
          }
          isOpen={showTerminal}
          onClose={() => setShowTerminal(false)}
        />

        <TableToolbar
          title={strings.servers}
          totalItems={totalItems}
          table={table}
          refetch={refetch}
          refreshLoading={isLoading}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />
        <DataTable table={table} childComponent={ServerListChild} />
      </div>
    </>
  );
};

export default Servers;
