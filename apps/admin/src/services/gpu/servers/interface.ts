export interface IExitQueueRequestPayload {
  profile: string;
  user_id: string;
}

export interface IStopServerRequestPayload {
  user_id: string;
  email: string;
}

export interface CloudStorageSetting {
  id?: string;
  price: number;
  jupyter_default_capacity: number;
  volume_max_size: number;
  renew_factor_day: number;
  remove_data_day: number;
  last_notif_data_day: number;
}
export type UpdateCloudStorageSetting = Partial<CloudStorageSetting>;
