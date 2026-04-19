export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginEndpoints = {
  frontend_app_url: string;
  backend_api_url: string;
  backend_api_origin: string;
  reverb_public_url: string;
};

export type TLoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  roles?: string[];
  permissions?: string[];
  account_type?: string;
  endpoints?: TLoginEndpoints;
};
