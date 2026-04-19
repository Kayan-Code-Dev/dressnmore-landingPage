import { api } from "@/api/api-public";
import type { TLoginRequest, TLoginResponse } from "./auth.types";

/** يطابق مسار الباكند: …/api/v1/admin/login (مثال: https://alhatoum.dressnmore.it.com/api/v1/admin/login) */
export const loginApi = async (body: TLoginRequest) => {
  const { data } = await api.post<TLoginResponse>("/admin/login", body);
  return data;
};
