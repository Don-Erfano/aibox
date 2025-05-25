import { IGetShareResponsePayload } from '@/services/user/info/user-setting/provider-share';

export interface ProviderShareProps {
  data?: IGetShareResponsePayload;
  userId: string;
}

export type FormValues = {
  providerShare?: number;
};
