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
  total_count: 24;
  page_count: 5;
  data: ILogData[];
}

export type { IGetApisLogsResponsePayload, ILogData };
