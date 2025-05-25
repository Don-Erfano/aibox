export interface IGetShareRequestPayload {
  id?: string;
}

export interface IUpdateShareRequestPayload {
  id: string;
  earnings_coefficient_api: number;
}

export interface IGetShareResponsePayload {
  owner_earning_coefficient: number;
  withdraw_coefficient: number;
}

export interface IUpdateShareResponsePayload {
  owner_earning_coefficient: number;
  withdraw_coefficient: number;
}
