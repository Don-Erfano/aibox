interface ILogData {
  id: string;
  email: string;
  created_at: string;
  nick_name: string;
  api_count: number;
  profile_picture: string;
  all_earning: number;
  all_requests: number;
  avg_api_rate: number;
  avg_delay_time_millisecond: number;
}

interface IGetApisLogsResponsePayload {
  total_count: number;
  page_count: number;
  data: ILogData[];
}

interface IGetApisLogsRequestPayload {
  user: string;
  all_requests__gte: number;
  all_requests__lte: number;
  api_count__gte: number;
  api_count__lte: number;
  all_earning__gte: number;
  all_earning__lte: number;
  avg_api_rate__gte: number;
  avg_api_rate__lte: number;
  avg_delay_time_millisecond__gte: number;
  avg_delay_time_millisecond__lte: number;
  created_at__gte: string;
  created_at__lte: string;
  page_size: number;
  page: number;
  search: string;
  ordering: string;
}

export type {
  ILogData,
  IGetApisLogsRequestPayload,
  IGetApisLogsResponsePayload,
};
