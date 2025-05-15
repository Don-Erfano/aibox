'use client';
import { useLayoutPadding } from './layoutContext';
import { Button } from '@aibox/ui';

export default function Dashboard() {
  const { setFullWidth } = useLayoutPadding();

  const fullWidthChildren = () => {
    setFullWidth(true);
  };
  const paddingChildren = () => {
    setFullWidth(false);
  };
  return (
    <div>
      Dashboard
      <div>
        <Button onClick={fullWidthChildren}>full width layout</Button>
      </div>
      <div>
        <Button onClick={paddingChildren}>with padding layout</Button>
      </div>
    </div>
  );
}
