const DEFAULT_APP_ORIGIN = "https://dressnmore.it.com";

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, "");

function normalizeAppOrigin(raw: string | undefined): string {
  const s = raw?.trim();
  if (!s) return DEFAULT_APP_ORIGIN;

  // مسار نسبي أو "/" فقط → يؤدي إلى /login داخل اللاندينغ ويبدو أن الزر لا يعمل
  if (s.startsWith("/") && !s.startsWith("//")) {
    return DEFAULT_APP_ORIGIN;
  }

  let origin = trimTrailingSlash(s);
  if (!origin) return DEFAULT_APP_ORIGIN;

  if (!/^https?:\/\//i.test(origin)) {
    origin = trimTrailingSlash(`https://${origin}`);
  }

  try {
    const u = new URL(origin);
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      return DEFAULT_APP_ORIGIN;
    }
    return u.origin;
  } catch {
    return DEFAULT_APP_ORIGIN;
  }
}

/** أصل تطبيق الـ ERP (صفحة تسجيل الدخول). يُقرأ من VITE_APP_URL مع سقوط آمن إلى dressnmore.it.com */
export function getAppOrigin(): string {
  return normalizeAppOrigin(import.meta.env.VITE_APP_URL);
}

export function getLoginUrl(): string {
  return `${getAppOrigin()}/login`;
}
