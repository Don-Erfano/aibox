import { IProviderShareResponse } from '@/services/user/info/user-setting/provider-share';

export interface ProviderShareProps {
  data?: IProviderShareResponse;
}

export type FormValues = {
  providerShare?: number;
};
