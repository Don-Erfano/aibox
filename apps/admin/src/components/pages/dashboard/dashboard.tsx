import { NextPage } from 'next';
import {
  ActiveUserCard,
  APIMarketCard,
  ApiPlatformCard,
  GpuComputingCard,
  IncomeCard,
  InfoCard,
  MostPopularAPICard,
  MostSellerApiCard,
  MostUseGpuCard,
  NewUsersCard,
  TicketCard,
} from './components';

const Dashboard: NextPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <InfoCard />
      <div className="grid grid-cols-2 2xl:grid-cols-1 gap-5 md:grid-cols-1 xl:grid-cols-2">
        <NewUsersCard />
      </div>
      <div className="flex gap-5 flex-row-reverse">
        <ActiveUserCard />
        <IncomeCard />
        <ApiPlatformCard />
      </div>
      <div className="grid 2xl:grid-cols-3 gap-5">
        <APIMarketCard />
        <MostPopularAPICard />
        <MostSellerApiCard />
        <GpuComputingCard />
        <MostUseGpuCard />
        <TicketCard />
      </div>
    </div>
  );
};

export default Dashboard;
