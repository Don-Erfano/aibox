interface IUserCountResponsePayload {
  all_user_count: number;
  monthly_growth_rate: number;
  market_user_count: number;
  platform_user_count: number;
  gpu_user_count: number;
  common_user_count: number;
}

interface IIncomeResponsePayload {
  income_info: {
    title: string;
    income: number;
  }[];
  total_income: number;
  remain_charge: number;
}

interface IDashboardInfoResponsePayload {
  waiting_ticket_count: number;
  waiting_version_count: number;
  api_queue_user_count: number;
  gpu_queue_user_count: number;
}

interface IChartDataResponsePayload {
  user_count_data: {
    user_count: number[];
    domain: string;
  }[];
  dates: string[];
  all_user_count: number;
  growth_rate: number;
  active_user_count: number;
  new_user_count: number;
  domain_user_count: {
    domain: string;
    user_count: number;
    percent_count: number;
  }[];
}

interface IAPIMarketDataResponsePayload {
  market_user_count: number;
  api_queue_user_count: number;
  market_api_count: number;
}

interface IPopularApiResponsePayload {
  version_info: {
    api_name: string;
    version_name: string;
    requests: number;
  }[];
}

interface IGpuUsersResponsePayload {
  in_queue_users_count: number;
  average_usage_time: number;
  average_queue_time: number;
  running_users_count: number;
}

interface IMostSellerApiResponsePayload {
  version_info: {
    api_name: string;
    version_name: string;
    all_earnings: number;
  }[];
}

interface ITicketApiResponsePayload {
  ticket_info: {
    category_name: string;
    ticket_count: number;
  }[];
}

interface IApiPlatformDataResponsePayload {
  version_info: {
    status: string;
    count: number;
  }[];
  total_count: number;
}

interface IMostUseGpuResponsePayload {
  packages: {
    gpu_name: string;
    package_count: number;
  }[];
}

export type {
  IUserCountResponsePayload,
  IIncomeResponsePayload,
  IDashboardInfoResponsePayload,
  IChartDataResponsePayload,
  IAPIMarketDataResponsePayload,
  IPopularApiResponsePayload,
  IGpuUsersResponsePayload,
  IMostSellerApiResponsePayload,
  IApiPlatformDataResponsePayload,
  ITicketApiResponsePayload,
  IMostUseGpuResponsePayload,
};
