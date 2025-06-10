interface IProviderShareRequest {
  id?: string;
}

interface IProviderShareResponse {
  owner_earning_coefficient: number;
  withdraw_coefficient: number;
}

interface IUpdateShareRequestPayload {
  id: string;
  earnings_coefficient_api: number;
}
interface IUpdateShareResponsePayload {
  owner_earning_coefficient: number;
  withdraw_coefficient: number;
}

export type {
  IProviderShareRequest,
  IProviderShareResponse,
  IUpdateShareRequestPayload,
  IUpdateShareResponsePayload,
};
