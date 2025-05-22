import { Button } from '@aibox/ui';
import { ArrowLeft } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

const FormContainer: FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => (
  <div className="flex flex-col w-full gap-10 sm:gap-6 md:gap-10 xl:gap-12">
    <div className="flex justify-between items-center h-12 px-4 py-3 sm:px-8 md:px-16 lg:px-4 bg-gray-100 border-b border-t border-gray-200">
      <h5 className="text-md font-medium text-slate-950">{title}</h5>
      <Button variant="ghost" size="icon">
        <ArrowLeft size={48} />
      </Button>
    </div>
    {children}
  </div>
);

export default FormContainer;
