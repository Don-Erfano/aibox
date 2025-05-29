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

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <InfoCard />
      <div className="grid grid-cols-2 2xl:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)_minmax(0,_1fr)] gap-5 md:grid-cols-1">
        <ActiveUserCard />
        <NewUsersCard />
        <IncomeCard />
      </div>
      <div className="grid 2xl:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)_minmax(0,_1fr)] gap-5">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <APIMarketCard />
          <GpuComputingCard />
        </div>
        <div className="grid 2xl:grid-cols-2 gap-5 xl:grid-cols-2">
          <MostPopularAPICard />
          <MostSellerApiCard />
          <MostUseGpuCard />
          <TicketCard />
        </div>
        <ApiPlatformCard />
      </div>
    </div>
  );
};

export default Dashboard;
