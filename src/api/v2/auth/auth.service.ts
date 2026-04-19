import { api } from "@/api/api-public";
import type { TLoginRequest, TLoginResponse } from "./auth.types";

export const loginApi = async (body: TLoginRequest) => {
  const { data } = await api.post<TLoginResponse>("/login", body);
  return data;
};
