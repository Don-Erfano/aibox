import { IFactor } from '@/services/factor';

export const FactorTableChild = ({ row }: { row: IFactor }) => {
  return (
    <div className="px-4 py-5">
      <p className="text-zinc-600 text-wrap text-sm/6 font-normal">
        {row.description}
      </p>
    </div>
  );
};
