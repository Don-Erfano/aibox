export interface IGetShareRequestPayload {
  id?: string;
}

export interface IGetShareResponsePayload {
  owner_earning_coefficient: number;
  withdraw_coefficient: number;
}
