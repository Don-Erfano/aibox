'use client';

import { FC, useState } from 'react';
import { CopyPlus } from 'lucide-react';
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
import {
  useGetAllGpusList,
  useGetAllMotherboardsList,
  useGetConfigurationData,
} from '@/services/gpu';

import DeleteModal from './delete-modal';
import { ConfigurationCols } from './constants';

const ConfigurationList: FC = () => {
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const { configs, totalItems, totalPages, isLoading } =
    useGetConfigurationData();
  const { data: gpus, isLoading: fetchGpus } = useGetAllGpusList();
  const { data: motherboards, isLoading: fetchMotherboards } =
    useGetAllMotherboardsList();
  const { table } = useDataTable({
    data: configs,
    columns: ConfigurationCols({
      motherboards: motherboards?.data.data.results,
      gpus: gpus?.data.data.results,
    }),
    enableRowSelection: true,
    actions: {
      onDelete: (r) => setOpenModal(r.id),
      onEdit: (r) => push(`${GPU_ROUTES.CONFIGURATION}/${r.id}`),
      customActions: [
        {
          icon: <CopyPlus className="pointer-events-none stroke-gray-400" />,
          label: strings.duplicateConfiguration,
          onClick: () => console.log('click'),
        },
      ],
    },
    pageCount: totalPages,
  });

  if (isLoading || fetchMotherboards || fetchGpus)
    return (
      <TableContainer>
        <DataTableSkeleton columnCount={10} />
      </TableContainer>
    );

  return (
    <TableContainer>
      <DeleteModal handleClose={(s) => setOpenModal(s)} openModal={openModal} />
      <TableToolbar
        title={strings.configuration}
        table={table}
        totalItems={totalItems}
        // searchPlaceholder="جستجو در GPU، مادربرد، نوع بسته، قیمت و تخفیف"
        searchPlaceholder={strings.searchIn([
          'GPU',
          strings.motherboard,
          strings.packageType,
          strings.price,
          strings.worth,
          strings.discount,
        ])}
      />
      <DataTable table={table} />
      <FabButton onClick={() => push(`${GPU_ROUTES.CONFIGURATION}/add`)} />
    </TableContainer>
  );
};

export default ConfigurationList;
