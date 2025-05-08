import { AppSidebar } from '@aibox/ui';
import { dataaa } from './constants';

export const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between">
      <AppSidebar data={dataaa} />
    </div>
  );
};
