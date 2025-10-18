interface ILogiPayload {
  username: string;
  password: string;
  captcha_key?: string;
  captcha_value?: string;
}

interface ILogiResponse {
  token: {
    scope: string;
    token: string;
    expires_in: string;
    token_type: string;
    access_token: string;
    refresh_token: string;
    session_state: string;
    not_before_policy: string;
    refresh_expires_in: string;
    is_admin: boolean;
  };
  need_captcha: boolean;
  wrong_captcha: boolean;
  unverified_email: boolean;
  unverified_phone: boolean;
}

export type { ILogiPayload, ILogiResponse };
