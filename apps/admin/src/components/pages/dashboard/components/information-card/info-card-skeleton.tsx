import { FC } from 'react';

import { CardBody, CardContainer, CardFooter } from '@aibox/ui';

const InfoCardSkeleton: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-y-4 xl:grid-cols-4">
      {Array.from(Array(4)).map((_, i) => (
        <CardContainer key={i} className="flex h-[174px]">
          <CardBody>
            <div className="flex items-center justify-between sm:flex-col sm:gap-4 2xl:flex-row">
              <div className="flex items-center justify-between gap-2 self-start">
                <div className="size-11 animate-pulse rounded-md bg-gray-100 p-2" />
                <p className="text-md animate-pulse bg-gray-100 font-medium text-zinc-700" />
              </div>
              <h2 className="text-2xl leading-12 font-medium text-zinc-700 md:text-[28px] 2xl:text-4xl" />
            </div>
          </CardBody>
          <CardFooter>
            <div className="h-[38px] animate-pulse rounded-md bg-gray-100 p-2" />
          </CardFooter>
        </CardContainer>
      ))}
    </div>
  );
};

export default InfoCardSkeleton;
