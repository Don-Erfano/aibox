import { Button } from '../../button';
import { Modal } from '../../modal';
import { useIsLargeView } from '../hooks';
import { FilterFormProps } from '../types';
import { TableFiltersForm } from './table-filters-form';

export const FilterForm = <TData,>(props: FilterFormProps<TData>) => {
  const { columns, onSubmit, open, onOpenChange, onClose } = props;

  const isLageView = useIsLargeView();

  const filterForm = (
    <form className="p-2 flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((column) => (
          <TableFiltersForm key={column.id} column={column} />
        ))}
      </div>
      <Button variant="outline" type="submit">
        فیلتر
      </Button>
    </form>
  );

  return isLageView ? (
    filterForm
  ) : (
    <Modal
      title="فرم فیلتر"
      open={open}
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      {filterForm}
    </Modal>
  );
};
