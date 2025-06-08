export interface IGetAllUserListRequestPayload {
  is_admin?: boolean;
  search?: string;
}

export interface IGetAllUserListResponsePayload {
  users: {
    id: string;
    email: string;
    phone_number: string;
  }[];
}
