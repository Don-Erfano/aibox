import { TableRowDetailsProps } from '../types';

export const TableRowDetails = <T,>({
  data,
  fields,
}: TableRowDetailsProps<T>) => {
  return (
    <div className="flex sm:px-4 sm:py-5 flex-col gap-2">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex justify-between items-start w-full gap-2"
        >
          <p
            className="text-state-800 text-sm font-medium truncate max-w-[40%] min-w-0"
            title={field.label}
          >
            {field.label}:
          </p>
          <p className="text-zinc-700 text-sm font-normal text-end break-words max-w-[60%] min-w-0">
            {String(data[field.key] || '---')}
          </p>
        </div>
      ))}
    </div>
  );
};
