interface ILogiPayload {
  username: string;
  password: string;
}

interface ILogiResponse {
  token: string;
  refresh_token: string;
  expires_in: string;
  refresh_expires_in: string;
  token_type: string;
  not_before_policy: string;
  session_state: string;
  scope: string;
}

export type { ILogiPayload, ILogiResponse };
