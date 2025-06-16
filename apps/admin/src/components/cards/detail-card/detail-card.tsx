import { FC } from 'react';
import { DetailCardProps } from '@/components/cards/detail-card/interface';

const DetailCard: FC<DetailCardProps> = ({ title, label, credit }) => {
  return (
    <div className="md:max-w-100 w-full h-32 flex-col bg-white rounded-lg shadow-[0px_3px_12px_0px_rgba(0,0,0,0.16)]">
      <div className=" relative flex-col p-6 space-y-7">
        <p className="text-teal-600 flex items-center justify-center text-base font-medium whitespace-nowrap">
          {title}
        </p>
        <div className="flex items-center font-medium text-base gap-x-2 justify-center">
          <span>{credit}</span>
          <p className="text-base font-medium text-zinc-700">{label}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailCard;
