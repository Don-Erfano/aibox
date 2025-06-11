export interface IUpdateUserStatusRequestPayload {
  id?: string;
}

export interface IUpdateUserStatusResponsePayload {
  owner_earning_coefficient: number;
  withdraw_coefficient: number;
}
