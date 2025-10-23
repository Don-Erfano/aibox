import { Server } from 'lucide-react';

import { strings } from '@/constant';
import { AIIcon, CashIcon, GPUIcon } from '@aibox/ui';

const normalizedData = (
  incomeData:
    | {
        [key: string]: string | number;
      }
    | undefined
) => {
  const chartData = [
    {
      id: '1',
      name: strings.remainCharge,
      amount: Number(incomeData?.remain_charge || 0),
    },
    {
      id: '2',
      name: strings.gpuComputing,
      amount: Number(incomeData?.platform || 0),
    },
    { id: '3', name: strings.usedApi, amount: Number(incomeData?.volume || 0) },
    {
      id: '4',
      name: strings.others,
      amount: Number(incomeData?.other || 0),
    },
  ];

  const dataTemp = [
    {
      icon: <GPUIcon />,
      title: strings.gpuComputing,
      description: strings.totalGpuComputing,
      income: Number(incomeData?.compute || 0),
    },
    {
      icon: <AIIcon />,
      title: strings.aiServeices,
      description: strings.aiServicesIncomeDescription,
      income: Number(incomeData?.platform || 0),
    },
    {
      icon: <Server className="stroke-[1.5] text-teal-600" />,
      title: strings.storage,
      description: strings.storageDashboardDescription,
      income: Number(incomeData?.volume || 0),
    },
    {
      icon: <CashIcon />,
      title: strings.others,
      description: strings.otherIncomeDashboardDescription,
      income: Number(incomeData?.other || 0),
    },
  ];

  return { chartData, dataTemp };
};

export { normalizedData };
