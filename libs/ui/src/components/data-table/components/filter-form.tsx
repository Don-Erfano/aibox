import { Button } from '../../button';
import { Modal } from '../../modal';
import { FilterFormProps } from '../types';
import { TableFiltersForm } from './table-filters-form';

export const FilterForm = <TData,>(props: FilterFormProps<TData>) => {
  const { columns, onSubmit, open, onOpenChange, onClose } = props;

  const filterForm = (
    <form
      className="p-2 flex flex-col items-center gap-4 lg:gap-6 lg:py-5"
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {columns.map((column) => (
          <TableFiltersForm key={column.id} column={column} />
        ))}
      </div>
      <Button className="w-fit" variant="outline" isFilled type="submit">
        فیلتر
      </Button>
    </form>
  );

  return (
    <>
      <div className="hidden lg:block">{filterForm}</div>
      <Modal
        className="block lg:hidden"
        title="فرم فیلتر"
        open={open}
        onOpenChange={onOpenChange}
        onClose={onClose}
      >
        {filterForm}
      </Modal>
    </>
  );
};
