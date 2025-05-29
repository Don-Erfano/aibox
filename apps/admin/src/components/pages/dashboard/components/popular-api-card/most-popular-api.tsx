import { Card } from '@/components/cards';
import { useGetPopularApis } from '@/services';
import { FC } from 'react';
import { DefaultAvatar } from '../../icons';

const MostPopularAPICard: FC = () => {
  const { data, isFetching } = useGetPopularApis();
  console.log(data);
  return (
    <Card
      title="APIهای پرتقاضا"
      hasMoreOpt
      className="gap-8 justify-start !h-[297px]"
    >
      <div className="flex flex-col gap-6">
        {!isFetching ? (
          data?.version_info.map((api, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex gap-2 items-center">
                <DefaultAvatar />
                <div className="text-sm">
                  <p className="font-medium text-zinc-700">{api.api_name}</p>
                  <span className="text-zinc-600">{api.version_name}</span>
                </div>
              </div>
              <span className="text-xs">{api.requests}</span>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default MostPopularAPICard;
