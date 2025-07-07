'use client';

import { Button } from '@aibox/ui';
import { ArrowLeft, Trash } from 'lucide-react';
import { FC, Fragment } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IFormContainer } from './interface';
import { strings } from '@/constant';

const FormContainer: FC<IFormContainer> = ({
  children,
  title,
  onDelete,
  customActions,
}) => {
  const { back } = useRouter();
  const { id } = useParams();
  return (
    <div className="flex flex-col w-full gap-10 sm:gap-6 md:gap-10 xl:gap-12">
      <div className="flex justify-between items-center h-12 px-4 py-3 sm:px-8 md:px-16 lg:px-4 bg-gray-100 border-b border-t border-gray-200">
        <h5 className="text-md font-medium text-slate-950">{title}</h5>
        <div className="flex items-center gap-2">
          {customActions?.map((action) => (
            <Fragment key={action.tooltip}>
              <Button
                variant="ghost"
                tooltip={action.tooltip}
                asChild
                size="icon"
                onClick={action.onClick}
              >
                {action.icon}
              </Button>
            </Fragment>
          ))}
          {onDelete && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              onClick={() => onDelete(id)}
            >
              <Trash size={24} />
            </Button>
          )}
          <Button
            variant="ghost"
            tooltip={strings.return}
            size="icon"
            onClick={() => back()}
          >
            <ArrowLeft size={24} />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default FormContainer;
