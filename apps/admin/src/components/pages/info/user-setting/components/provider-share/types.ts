import { IProviderShareResponse } from '@/services/user/info/user-setting/provider-share';

export interface ProviderShareProps {
  data?: IProviderShareResponse;
  userId: string;
}

export type FormValues = {
  providerShare?: number;
};
