'use client';

import { FC, Fragment } from 'react';
import { ArrowLeft, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { IFormContainer } from './interface';
import { Button } from '../form';

const FormContainer: FC<IFormContainer> = ({
  children,
  title,
  onDelete,
  customActions,
}) => {
  const { back } = useRouter();
  const { id } = useParams();
  return (
    <div className="flex w-full flex-col gap-10 sm:gap-6 md:gap-10 xl:gap-12">
      <div className="flex h-12 items-center justify-between border-t border-b border-gray-200 bg-gray-100 px-4 py-3 sm:px-8 md:px-16 lg:px-4">
        <h5 className="text-md font-medium text-slate-950">{title}</h5>
        <div className="flex items-center gap-2">
          {customActions?.map((action) => (
            <Fragment key={action.tooltip}>
              <Button
                variant="ghost"
                tooltip={action.tooltip}
                asChild
                size="icon"
                type="button"
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
              type="button"
              onClick={() => onDelete(id)}
            >
              <Trash size={24} />
            </Button>
          )}
          <Button
            variant="ghost"
            tooltip="بازگشت"
            size="icon"
            type="button"
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
