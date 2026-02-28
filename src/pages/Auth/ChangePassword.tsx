import { Link, useNavigate } from "react-router-dom";
import TrustRow from "../../components/ui/TrustRow";
import Button from "../../components/ui/Button";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "../../components/ui/Input";
import BackLink from "../../components/ui/BackLink";
import MobileLogo from "../../components/MobileLogo";
import LeftPanel from "../../components/LeftPanel";
import { useForm, type SubmitHandler } from "react-hook-form";
import { resetPasswordSchema, type ResetPasswordInput } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useResetPassStore } from "../../store/useRestPassword";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { isChangePass, resetPassword } = useResetPassStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const passwordValue = watch("password", "");

  // Password strength calculator
  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(passwordValue);
  const strengthColors = [
    "bg-slate-200",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-emerald-500",
  ];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    await resetPassword({ password: data.password });
    console.log("New password:", data.password);
    await new Promise((r) => setTimeout(r, 1000)); // simulate
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      <LeftPanel
        badge="Almost there!"
        icon={<Lock size={28} color="white" strokeWidth={1.5} />}
        title="Create a new"
        highlight="password."
        description="Choose a strong password that you haven't used before to keep your account secure."
        steps={[
          { label: "Enter your email address", active: false },
          { label: "Verify the OTP code", active: false },
          { label: "Set a new password", active: true },
        ]}
      />

      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <MobileLogo />
          <BackLink to="/verify-otp" label="Back" />

          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
              <Lock size={22} className="text-violet-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Set new password
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              Must be at least 8 characters and include uppercase, a number, and
              a special character.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  inputSize="md"
                  variant={errors.password ? "error" : "default"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 py-3 pl-4 pr-10 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-0.5">
                  {errors.password.message}
                </p>
              )}

              {/* Strength meter */}
              {passwordValue.length > 0 && (
                <div className="mt-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                          i <= strength
                            ? strengthColors[strength]
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs mt-1 font-medium ${
                      strength <= 1
                        ? "text-red-500"
                        : strength === 2
                          ? "text-orange-500"
                          : strength === 3
                            ? "text-yellow-600"
                            : "text-emerald-600"
                    }`}
                  >
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  inputSize="md"
                  variant={errors.confirmPassword ? "error" : "default"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 py-3 pl-4 pr-10 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all duration-200"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-0.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Password rules checklist */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                Password requirements
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  {
                    label: "At least 8 characters",
                    met: passwordValue.length >= 8,
                  },
                  {
                    label: "One uppercase letter",
                    met: /[A-Z]/.test(passwordValue),
                  },
                  { label: "One number", met: /[0-9]/.test(passwordValue) },
                  {
                    label: "One special character",
                    met: /[^A-Za-z0-9]/.test(passwordValue),
                  },
                ].map(({ label, met }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${met ? "bg-emerald-500" : "bg-slate-200"}`}
                    >
                      {met && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="9"
                          height="9"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-xs transition-colors ${met ? "text-emerald-600 font-medium" : "text-slate-400"}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              width={"full"}
              loading={isChangePass}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm tracking-wide hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-violet-200 active:scale-95 transition-all duration-200"
            >
              Reset Password
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Back to{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-600 hover:text-violet-800 transition-colors"
            >
              Sign in
            </Link>
          </p>

          <TrustRow />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
