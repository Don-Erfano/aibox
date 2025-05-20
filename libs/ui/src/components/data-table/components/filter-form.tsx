import { Button } from '../../form';
import { Modal } from '../../modal';
import { FilterFormProps } from '../types';
import { TableFiltersForm } from './table-filters-form';

export const FilterForm = <TData,>(props: FilterFormProps<TData>) => {
  const { columns, onSubmit, open, onOpenChange, onClose } = props;

  const filterForm = (
    <form
      className="flex flex-col items-center gap-6 lg:py-4"
      onSubmit={onSubmit}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 lg:px-6 xl:px-12">
        {columns.map((column) => (
          <TableFiltersForm key={column.id} column={column} />
        ))}
      </div>
      <Button className="w-fit" variant="outline" isFilled type="submit">
        اعمال فیلتر
      </Button>
    </form>
  );

  return (
    <>
      <div className="hidden lg:block">{filterForm}</div>
      <Modal
        title="فیلتر"
        open={open}
        onOpenChange={onOpenChange}
        onClose={onClose}
      >
        {filterForm}
      </Modal>
    </>
  );
};
