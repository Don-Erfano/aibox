import { TableRowDetailsProps } from "../types";

export const TableRowDetails = <T,>({
  data,
  fields,
}: TableRowDetailsProps<T>) => {
  return (
    <div className="flex flex-col gap-2 sm:px-4 sm:py-5">
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex w-full items-start justify-between gap-2"
        >
          <p
            className="text-state-800 max-w-[40%] min-w-0 truncate text-sm font-medium"
            title={field.label}
          >
            {field.label}:
          </p>
          <p className="max-w-[60%] min-w-0 text-end text-sm font-normal break-words text-zinc-700">
            {String(data[field.key] || "---")}
          </p>
        </div>
      ))}
    </div>
  );
};
