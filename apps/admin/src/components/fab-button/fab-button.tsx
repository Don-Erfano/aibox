import { FC } from 'react';
import { Button } from '@aibox/ui';
import { FabButtonProps } from './interface';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

const FabButton: FC<FabButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={clsx(
        'size-14 fixed left-11 bottom-10 rounded-full bg-teal-600 shadow-2xl z-100 text-2xl hover:!bg-teal-700'
      )}
    >
      <Plus strokeWidth={2.5} className="text-white size-6" />
    </Button>
  );
};

export default FabButton;
