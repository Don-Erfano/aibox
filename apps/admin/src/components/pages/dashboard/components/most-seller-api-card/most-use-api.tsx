import { FC } from 'react';

import { Card } from '@/components/cards';
import { useGetMostSellerApi } from '@/services';
import { DefaultAvatar } from '../../icons';

const MostSellerApiCard: FC = () => {
  const { data, isFetching } = useGetMostSellerApi();
  return (
    <Card title="APIهای پردرآمد" hasMoreOpt className="!h-[297px]">
      <div className="flex flex-col gap-6">
        {!isFetching &&
          data?.version_info.map((api, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex gap-2 items-center">
                <DefaultAvatar />
                <div className="text-sm">
                  <p className="font-medium text-zinc-700">{api.api_name}</p>
                  <span className="text-zinc-600">{api.version_name}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {api.all_earnings.toLocaleString()} تومان
              </span>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default MostSellerApiCard;
