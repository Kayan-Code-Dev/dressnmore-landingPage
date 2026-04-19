import type { TLoginResponse } from "@/api/v2/auth/auth.types";

const HASH_PREFIX = "#bootstrap=";

function utf8ToBase64Json(obj: unknown): string {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

/** للتحويل إلى تطبيق العميل على السب دومين بعد تسجيل الدخول من اللاندينغ */
export function buildTenantAuthBootstrapHash(data: TLoginResponse): string {
  return `${HASH_PREFIX}${encodeURIComponent(utf8ToBase64Json(data))}`;
}
