'use client';

import { FormContainer, FormWrapper } from '@/components';
import { useLayoutPadding } from './layout-context';
import { Button } from '@aibox/ui';

export default function Dashboard() {
  const { setMode } = useLayoutPadding();

  const fullWidthChildren = () => {
    setMode('full');
  };
  const paddingChildren = () => {
    setMode('default');
  };
  return (
    <>
      <div className="bg-teal-600 lg:bg-red-800">
        Dashboard
        <div>
          <Button onClick={fullWidthChildren}>full width layout</Button>
        </div>
        <div>
          <Button onClick={paddingChildren}>with padding layout</Button>
        </div>
      </div>
      <FormContainer title="sample">
        <FormWrapper>
          <div className="bg-red-400 h-4" />
          <div className="bg-blue-400 h-4" />
          <div className="bg-red-400 h-4" />
          <div className="bg-blue-400 h-4" />
          <div className="bg-red-400 h-4" />
          <div className="bg-blue-400 h-4" />
        </FormWrapper>
        <div className="flex gap-5 justify-center">
          <Button size="lg" isFilled>
            ثبت
          </Button>
          <Button size="lg">لغو عملیات</Button>
        </div>
      </FormContainer>
    </>
  );
}
