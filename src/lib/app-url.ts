const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

/** واجهة الـ ERP (تسجيل الدخول على dressnmore.it.com). التحويل بعد المصادقة إلى تطبيق العميل يتم من الباكند حسب السب دومين. */
export function getAppOrigin(): string {
  const raw = import.meta.env.VITE_APP_URL?.trim();
  if (raw) return trimTrailingSlash(raw);
  return "https://dressnmore.it.com";
}

export function getLoginUrl(): string {
  return `${getAppOrigin()}/login`;
}
