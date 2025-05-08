export interface INetworkResponse<D, I = string> {
  code: string;
  data: D;
  detail: I;
}
