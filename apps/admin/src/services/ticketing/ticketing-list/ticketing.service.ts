import { AxiosResponse } from 'axios';
import {
  IGetTicketListRequest,
  IGetTicketListResponse,
  IPostTicketRequest,
  IAssignTicketRequest,
  IAssignTicketPathParams,
  IAssignTicketResponse,
  IUpdateTicketStatusRequest,
  IUpdateTicketStatusResponsePayload,
  ITicket,
  IGetAllTicketsResponse,
  IUpdateTicketCategoryPathParams,
  IUpdateTicketCategoryPayload,
  IUpdateTicketCategoryResponse,
  IGetTicketDetailPathParams,
  IGetTicketDetailResponse,
  IAnswerTicketPathParams,
  IAnswerTicketPayload,
  IAnswerTicketResponse,
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
  public async getTicketDetail(
    path: IGetTicketDetailPathParams
  ): Promise<AxiosResponse<IGetTicketDetailResponse>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/${path.id}/`,
    });
  }
  public async getAllTickets(
    params: IGetTicketListRequest
  ): Promise<AxiosResponse<INetworkResponse<IGetAllTicketsResponse>>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/all/`,
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
    payload: IUpdateTicketStatusRequest
  ): Promise<
    AxiosResponse<INetworkResponse<IUpdateTicketStatusResponsePayload>>
  > {
    const { id, status } = payload;
    return this.http.request({
      method: 'PUT',
      url: `${this.url}/${id}/status/`,
      data: { status },
    });
  }
  public async updateTicketCategory(
    path: IUpdateTicketCategoryPathParams,
    payload: IUpdateTicketCategoryPayload
  ): Promise<AxiosResponse<INetworkResponse<IUpdateTicketCategoryResponse>>> {
    return this.http.request({
      method: 'PUT',
      url: `${this.url}/${path.id}/`,
      data: payload.data,
    });
  }
  public async answerTicket(
    path: IAnswerTicketPathParams,
    payload: IAnswerTicketPayload
  ): Promise<AxiosResponse<INetworkResponse<IAnswerTicketResponse>>> {
    return this.http.request({
      method: 'POST',
      url: `${this.url}/${path.id}/answer/`,
      data: payload.data,
    });
  }
}
