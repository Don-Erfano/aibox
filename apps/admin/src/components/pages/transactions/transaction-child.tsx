import { Transaction } from './interface';

export const TransactionChild = ({ row }: { row: Transaction }) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-5">
      {row.explication.map((item) => (
        <p key={item} className="text-sm/6 font-normal text-zinc-600">
          {item}
        </p>
      ))}
    </div>
  );
};
