import { loginApi } from "@/api/v2/auth/auth.service";
import { buildTenantAuthBootstrapHash } from "@/lib/tenant-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      if (!res?.token) {
        toast.error("استجابة غير صالحة من الخادم");
        return;
      }
      const frontend = res.endpoints?.frontend_app_url?.trim();
      if (frontend) {
        try {
          const base = frontend.replace(/\/+$/, "");
          window.location.replace(
            `${base}/dashboard${buildTenantAuthBootstrapHash(res)}`,
          );
          return;
        } catch {
          toast.error("تعذر تحويلك إلى لوحة التحكم");
          return;
        }
      }
      toast.error("لم يُرجع الخادم رابط تطبيق العميل. تواصل مع الدعم.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "فشل تسجيل الدخول");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const em = email.trim();
    if (!em.includes("@")) {
      toast.error("أدخل بريداً إلكترونياً صالحاً");
      return;
    }
    if (password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    mutate({ email: em, password });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-950 to-slate-900 relative overflow-hidden flex items-center justify-center px-4 py-12"
      dir="rtl"
    >
      <style>{`
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes blob { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        .shimmer-text { background: linear-gradient(90deg, #1e40af, #0ea5e9, #1e40af); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
        .blob { animation: blob 8s ease-in-out infinite; }
        .glass-card { background: rgba(255,255,255,0.95); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.2); }
        .text-gradient { background: linear-gradient(135deg, #1e3a8a, #0ea5e9, #38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.5) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(14,165,233,0.3) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blob"
        style={{ filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/10 blob"
        style={{ filter: "blur(50px)", animationDelay: "3s" }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors duration-300"
        >
          <i className="ri-arrow-right-line text-lg" />
          العودة للرئيسية
        </Link>

        <div className="glass-card rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-l from-blue-900 to-blue-600 px-8 py-8 text-center">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-blue-500 shadow-md">
                <i className="ri-scissors-cut-line text-white text-2xl" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                DressnMore
              </span>
            </Link>
            <h1 className="text-xl font-bold text-white mb-2">تسجيل الدخول</h1>
            <p className="text-white/80 text-sm">
              أدخل بياناتك للوصول إلى لوحة التحكم
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5" dir="rtl">
            <div>
              <label className="block text-right text-sm font-medium text-gray-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@dressnmore.com"
                  className="w-full pr-4 pl-11 text-right h-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-right text-sm font-medium text-gray-700 mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-4 pl-11 h-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "إخفاء كلمة السر" : "إظهار كلمة السر"}
                >
                  <i
                    className={`text-lg ${showPassword ? "ri-eye-off-line" : "ri-eye-line"}`}
                  />
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-right">جلسات آمنة ومشفرة</p>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-xl bg-gradient-to-l from-blue-900 to-blue-500 text-white font-bold text-base hover:shadow-lg hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-xl" />
                  جاري التحقق...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line" />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          <p className="px-8 pb-8 text-xs text-gray-500 text-center">
            يتم تأمين البيانات وتشفيرها لحماية معلوماتك
          </p>
        </div>
      </div>
    </div>
  );
}
