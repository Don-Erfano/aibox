interface IProviderShareRequest {
  id?: string;
}

interface IProviderShareResponse {
  owner_earning_coefficient: number;
  withdraw_coefficient: number;
}

export type { IProviderShareRequest, IProviderShareResponse };
