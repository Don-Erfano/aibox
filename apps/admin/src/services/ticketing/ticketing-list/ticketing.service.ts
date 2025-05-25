import { AxiosResponse } from 'axios';
import {
  IGetTicketListRequest,
  IGetTicketListResponse,
  IPostTicketRequest,
  IAssignTicketRequest,
  IAssignTicketPathParams,
  IAssignTicketResponse,
  IUpdateTicketStatusRequest,
  IUpdateTicketStatus,
  IUpdateTicketStatusResponsePayload,
  ITicket,
} from './interface';
import { AbstractAPI, INetworkResponse } from '@aibox/services';

export default class TicketingService extends AbstractAPI {
  constructor() {
    super('v1/admin/ticketing');
  }

  public async getTicketList(
    params: IGetTicketListRequest
  ): Promise<AxiosResponse<INetworkResponse<IGetTicketListResponse>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }

  public async postTicket(
    payload: IPostTicketRequest
  ): Promise<AxiosResponse<INetworkResponse<ITicket>>> {
    return this.http.request({
      method: 'POST',
      url: `${this.url}/`,
      data: payload,
    });
  }

  public async assignTicket(
    path: IAssignTicketPathParams,
    payload: IAssignTicketRequest
  ): Promise<AxiosResponse<INetworkResponse<IAssignTicketResponse>>> {
    return this.http.request({
      method: 'PUT',
      url: `${this.url}/${path.id}/assign/`,
      data: payload.data,
    });
  }

  public async updateTicketStatus(
    path: IUpdateTicketStatus,
    payload: IUpdateTicketStatusRequest
  ): Promise<
    AxiosResponse<INetworkResponse<IUpdateTicketStatusResponsePayload>>
  > {
    return this.http.request({
      method: 'PUT',
      url: `${this.url}/${path.id}/status/`,
      data: payload,
    });
  }
}
