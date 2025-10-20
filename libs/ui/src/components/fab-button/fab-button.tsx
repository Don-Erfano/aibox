import { FC } from 'react';
import { FabButtonProps } from './interface';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../form';

const FabButton: FC<FabButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={clsx(
        'fixed bottom-28 left-5 z-100 size-14 rounded-full bg-teal-600 text-2xl shadow-2xl hover:!bg-teal-600 sm:bottom-22'
      )}
    >
      <Plus strokeWidth={2.5} className="size-6 text-white" />
    </Button>
  );
};

export default FabButton;
