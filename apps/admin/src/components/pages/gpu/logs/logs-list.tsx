'use client';

import { FC, useState } from 'react';
import {
  CircleCheckBig,
  CircleX,
  PanelLeftOpen,
  RefreshCcw,
  RotateCcw,
  Trash,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  DataTable,
  DataTableSkeleton,
  TableContainer,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';

import { strings } from '@/constant';
import { FINANCE_ROUTES, GPU_ROUTES } from '@/routes';
import {
  useActivatePackage,
  useGetAllPackages,
  useGetGpuLogsList,
} from '@/services/gpu';

import { logsCol } from './constants';
import DeleteLogModal from './delete-log-modal';
import { ApprovalState } from './interface';
import { RejectModal } from './reject-modal';
import { ApproveModal } from './approve-modal';

const LogsList: FC = () => {
  const { push } = useRouter();
  const { logs, totalItems, totalPages, isLoading } = useGetGpuLogsList();
  const { data: packages } = useGetAllPackages();
  const [openModal, setOpenModal] = useState('');
  const [rejectModal, setRejectModal] = useState<ApprovalState>({
    show: false,
  });
  const [approveModal, setApproveModal] = useState<ApprovalState>({
    show: false,
  });

  const { mutate: activatePackage, isPending: isActivatePending } =
    useActivatePackage();

  const { table } = useDataTable({
    data: logs,
    columns: logsCol({ packages: packages?.data.data.results }),
    enableRowSelection: true,
    actions: {
      customActions: [
        {
          icon: <RefreshCcw strokeWidth={1.5} />,
          label: strings.changePackage,
          onClick: (r) => push(`${GPU_ROUTES.LOGS}/change-package/${r.id}`),
          hidden: (row) =>
            row.payment_type === 'MONTHLY' ||
            row?.status !== 'Active' ||
            row?.monthly_status === 'WaitApproval',
        },
        {
          icon: <PanelLeftOpen strokeWidth={1.5} />,
          label: strings.viewDetails,
          onClick: (row) =>
            push(`${FINANCE_ROUTES.FACTORS}?search=${row.factor_num}`),
          hidden: (row) => row?.monthly_status !== 'WaitPayment',
        },
        {
          icon: <CircleCheckBig strokeWidth={1.5} />,
          label: strings.approving,
          onClick: (row) => setApproveModal({ show: true, id: row.id }),
          hidden: (row) =>
            row.payment_type !== 'MONTHLY' ||
            row?.monthly_status !== 'WaitApproval',
        },
        {
          icon: <CircleX strokeWidth={1.5} />,
          label: strings.rejecting,
          onClick: (row) => setRejectModal({ show: true, id: row.id }),
          hidden: (row) =>
            row.payment_type !== 'MONTHLY' ||
            row?.monthly_status !== 'WaitApproval',
        },
        {
          icon: <RotateCcw strokeWidth={1.5} />,
          label: strings.reactivate,
          onClick: (row) => activatePackage(row.id),
          disabled: isActivatePending,
          hidden: (row) =>
            row.payment_type !== 'MONTHLY' ||
            row.monthly_status !== 'Activating',
        },
        {
          icon: <Trash strokeWidth={1.5} />,
          label: strings.deleteButtonText,
          onClick: (row) => setOpenModal(row.id),
          hidden: (row) =>
            row?.monthly_status !== 'WaitPayment' &&
            (row?.status !== 'Active' ||
              row?.monthly_status === 'WaitApproval' ||
              row.payment_type === 'MONTHLY'),
        },
      ],
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
      <DeleteLogModal handleClose={() => setOpenModal('')} id={openModal} />
      <RejectModal modalState={rejectModal} toggleModal={setRejectModal} />
      <ApproveModal modalState={approveModal} toggleModal={setApproveModal} />
      <TableToolbar
        title={strings.logInfo}
        totalItems={totalItems}
        table={table}
        searchPlaceholder={strings.searchIn([
          strings.userName,
          strings.packageName,
          strings.usage,
        ])}
      />

      <DataTable table={table} />
    </TableContainer>
  );
};
export default LogsList;
