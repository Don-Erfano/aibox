import { SecondNoDataIcon, Button } from '@aibox/ui';
import { FC } from 'react';
import { NoMessageProps } from './interface';
import { strings } from '@/constant';

const NoMessageTemplate: FC<NoMessageProps> = ({ onClick }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <SecondNoDataIcon />
      <p className="my-6 text-sm font-medium text-gray-400">
        {strings.anyDefaultMessage}
      </p>
      <Button size="lg" variant="default" onClick={onClick}>
        {strings.createDefaultMessage}
      </Button>
    </div>
  );
};
export default NoMessageTemplate;
