export interface LoginResponse {
  token?: {
    token: string;
  }

  status?: string;
  message?: string;
}
