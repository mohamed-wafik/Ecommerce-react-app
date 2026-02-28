import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { loginSchema, type LoginInput } from "../../schema";
import { LOGIN_FORM } from "../../data";
import Input from "../../components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuth";
import Button from "../../components/ui/Button";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoadingLogin } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const renderLoginInputs = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => {
      const isPassword = name === "password";

      return (
        <div className="flex flex-col gap-1.5" key={idx}>
          <div className="flex items-center justify-between">
            <label
              htmlFor={name}
              className="text-xs font-semibold tracking-widest uppercase text-slate-500"
            >
              {name}
            </label>
            {isPassword && (
              <a
                href="/forgotPassword"
                className="text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors"
              >
                Forgot password?
              </a>
            )}
          </div>

          <div className="relative">
            <Input
              type={isPassword ? (showPassword ? "text" : "password") : type}
              placeholder={placeholder}
              inputSize="md"
              variant={errors[name] ? "error" : "default"}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 py-3 pl-4 pr-10 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
              {...register(name, validation)}
            />
            {isPassword && (
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>

          {errors[name] && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors[name]?.message}
            </p>
          )}
        </div>
      );
    },
  );

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    await login(data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      {/* ── Left Brand Panel ── */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-indigo-900/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-500/20 blur-2xl" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Mohamed Wafik
          </span>
        </div>

        {/* Center hero */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-xs font-medium">
              Welcome back, explorer!
            </span>
          </div>

          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Your style,
            <br />
            your <span className="text-violet-200 italic">world.</span>
          </h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-xs">
            Sign in to access exclusive deals, track your orders, and manage
            your wishlist all in one place.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-10">
            {[
              { value: "50K+", label: "Products" },
              { value: "200K+", label: "Customers" },
              { value: "4.9★", label: "Rating" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
              >
                <div className="text-white font-bold text-xl">{value}</div>
                <div className="text-white/50 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badges */}
        <div className="relative z-10 flex items-center gap-5">
          {["Secure Checkout", "Free Returns", "24/7 Support"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-violet-300/60" />
              <span className="text-white/40 text-xs">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <span className="font-bold text-slate-800 text-lg">
              Mohamed Wafik
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Google
            </button>

            <button className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#1877f2"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.098 2.795.142v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .593 23.406 0 22.675 0z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
              or
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form — all original handler logic preserved */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {renderLoginInputs}

            <Button
              width={"full"}
              loading={isLoadingLogin}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm tracking-wide hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-violet-200 active:scale-95 transition-all duration-200"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-violet-600 hover:text-violet-800 transition-colors"
            >
              Sign up
            </Link>
          </p>

          {/* SSL trust note */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              className="text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <span className="text-xs text-slate-400">
              Secured by 256-bit SSL encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
