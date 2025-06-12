import { AxiosResponse } from 'axios';
import {
  AdminTransactionListParams,
  TransactionListNetworkResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from './interface';
import { AbstractAPI } from '@aibox/services';

export default class TransactionService extends AbstractAPI {
  constructor() {
    super('v1/admin/transaction');
  }
  public async getTransactionList(
    params: AdminTransactionListParams
  ): Promise<AxiosResponse<TransactionListNetworkResponse>> {
    return this.http.request({
      method: 'GET',
      url: `${this.url}/`,
      params,
    });
  }
  public async updateTransaction(
    transaction_id: string,
    data: UpdateTransactionRequest
  ): Promise<AxiosResponse<UpdateTransactionResponse>> {
    return this.http.request({
      method: 'PUT',
      url: `${this.url}/${transaction_id}/`,
      data,
    });
  }
}
