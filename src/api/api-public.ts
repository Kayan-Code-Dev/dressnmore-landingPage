import axios from "axios";
import { resolveError } from "@/api/api.utils";

const defaultBaseUrl = String(import.meta.env.VITE_BACKEND_URL ?? "").replace(
  /\/+$/,
  "",
);

export const api = axios.create({
  baseURL: defaultBaseUrl || undefined,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(resolveError(error))),
);
