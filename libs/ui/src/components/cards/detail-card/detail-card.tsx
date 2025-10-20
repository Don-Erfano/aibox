import { FC } from "react";
import { DetailCardProps } from "./interface";

const DetailCard: FC<DetailCardProps> = ({ title, label, credit }) => {
  return (
    <div className="h-32 w-full flex-col rounded-lg bg-white shadow-[0px_3px_12px_0px_rgba(0,0,0,0.16)] md:max-w-100">
      <div className="relative flex-col space-y-7 p-6">
        <p className="flex items-center justify-center text-base font-medium whitespace-nowrap text-teal-600">
          {title}
        </p>
        <div className="flex items-center justify-center gap-x-2 text-base font-medium">
          <span>{credit}</span>
          <p className="text-base font-medium text-zinc-700">{label}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailCard;
