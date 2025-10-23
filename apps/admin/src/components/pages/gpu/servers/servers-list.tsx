'use client';

import { FC, useMemo, useState } from 'react';
import { LogOut, Power } from 'lucide-react';

import {
  DataTable,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { useGetServerProfiles, useGetServers } from '@/services/gpu';
import { strings } from '@/constant';

import { seversCol } from './constants';
import CollapseRow from './server-row-collapse';
import ExitQueueModal from './exit-queue-modal';
import DownServerModal from './down-server-modal';

const ServersList: FC = () => {
  const [openModal, setOpenModal] = useState({
    user_id: '',
    email: '',
  });
  const [showExitModal, setShowExitModal] = useState({
    user_id: '',
    profile: '',
    email: '',
  });
  const { servers, totalItems, totalPages, isLoading } = useGetServers();
  const { data: profiles, isLoading: profileLoading } = useGetServerProfiles();

  const cols = useMemo(() => seversCol({ profiles }), [profiles]);

  const { table } = useDataTable({
    data: servers,
    columns: cols,
    enableExpand: true,
    actions: {
      customActions: [
        {
          icon: (row) => (
            <LogOut
              size={22}
              className={
                row.status === 'in_queue'
                  ? ''
                  : 'pointer-events-none !text-gray-300'
              }
            />
          ),
          label: strings.removeFromQueue,
          onClick: (row) =>
            setShowExitModal({
              profile: row.profile,
              user_id: row.user_id,
              email: row.email,
            }),
        },
        {
          icon: (row) => (
            <Power
              className={
                row.status === 'running'
                  ? ''
                  : 'pointer-events-none !text-gray-300'
              }
            />
          ),
          label: strings.downServer,
          onClick: (row) =>
            setOpenModal({
              user_id: row.user_id,
              email: row.email,
            }),
        },
      ],
    },
    pageCount: totalPages,
  });

  if (isLoading || profileLoading)
    return <DataTableSkeleton columnCount={10} />;

  return (
    <>
      <ExitQueueModal
        id={showExitModal}
        handleClose={() =>
          setShowExitModal({ profile: '', user_id: '', email: '' })
        }
      />
      <DownServerModal
        id={openModal}
        handleClose={() => setOpenModal({ email: '', user_id: '' })}
      />
      <TableToolbar
        title={strings.server}
        totalItems={totalItems}
        table={table}
        searchPlaceholder={strings.searchIn([
          strings.userName,
          strings.processor,
        ])}
      />

      <DataTable table={table} childComponent={CollapseRow} />
    </>
  );
};
export default ServersList;
