import { TableFiltersForm } from './TableFiltersForm';
import { FilterFormProps } from '../types';
import { Button } from '../../button';

export const FilterForm = <TData,>({
  columns,
  onSubmit,
}: FilterFormProps<TData>) => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <TableFiltersForm key={column.id} column={column} />
        ))}
      </div>
      <Button variant="outline" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};
