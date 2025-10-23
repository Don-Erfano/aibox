"use client";

import { NextPage } from "next";
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
} from "./components";

const Dashboard: NextPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <InfoCard />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-1">
        <NewUsersCard />
      </div>
      <div
        className="flex flex-wrap gap-5 xl:flex-nowrap"
        aria-label="analistics"
      >
        <IncomeCard />
        <ActiveUserCard />
        <ApiPlatformCard />
      </div>
      <div
        className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3"
        aria-label="information"
      >
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
